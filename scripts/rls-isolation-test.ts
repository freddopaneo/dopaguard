process.loadEnvFile(".env.local");
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

const admin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

const results: { test: string; pass: boolean; detail?: string }[] = [];
function record(test: string, pass: boolean, detail?: string) {
  results.push({ test, pass, detail });
  console.log(`${pass ? "✅" : "❌"} ${test}${detail ? " — " + detail : ""}`);
}

async function sessionClientFor(email: string) {
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (linkError || !linkData.properties?.hashed_token) throw linkError || new Error("no hashed_token");

  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data: verifyData, error: verifyError } = await anon.auth.verifyOtp({
    type: "magiclink",
    token_hash: linkData.properties.hashed_token,
  });
  if (verifyError || !verifyData.session) throw verifyError || new Error("no session");

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${verifyData.session.access_token}` } },
  });
}

async function main() {
  const stamp = Date.now();
  const emailA = `rls-test-a-${stamp}@dopaneo.ai`;
  const emailB = `rls-test-b-${stamp}@dopaneo.ai`;

  console.log("Création des deux comptes de test jetables...");
  const { data: userA, error: errA } = await admin.auth.admin.createUser({ email: emailA, email_confirm: true });
  const { data: userB, error: errB } = await admin.auth.admin.createUser({ email: emailB, email_confirm: true });
  if (errA || errB || !userA.user || !userB.user) throw errA || errB || new Error("user creation failed");

  const uidA = userA.user.id;
  const uidB = userB.user.id;

  try {
    // Marque + fiche de vérité + agence + abonnement pour B, pour avoir de vraies données à tenter de lire depuis A.
    const { data: brandB } = await admin
      .from("brands")
      .insert({ owner_id: uidB, name: "Marque B (test isolation)", status: "active", plan: "agence" })
      .select("id")
      .single();

    const { data: agencyB } = await admin
      .from("agencies")
      .insert({ owner_id: uidB, name: "Agence B (test isolation)", logo_url: "agence-b-secrete/logo.png" })
      .select("id")
      .single();

    await admin.from("truth_sheets").insert({ brand_id: brandB!.id, offering: "Secret de B" });
    await admin.from("subscriptions").insert({
      profile_id: uidB,
      stripe_customer_id: "cus_test_b",
      stripe_subscription_id: `sub_test_b_${stamp}`,
      plan: "agence",
      status: "active",
    });

    const { data: promptTemplate } = await admin.from("prompt_templates").select("id").limit(1).single();
    await admin.from("brand_prompts").insert({ brand_id: brandB!.id, prompt_template_id: promptTemplate!.id });

    const { data: responseB } = await admin
      .from("llm_responses")
      .insert({
        brand_id: brandB!.id,
        prompt_template_id: promptTemplate!.id,
        llm_provider: "anthropic",
        prompt_sent: "test",
        response_text: "Réponse secrète de B",
        week_number: 1,
        year: 2026,
      })
      .select("id")
      .single();

    await admin.from("anomalies").insert({
      brand_id: brandB!.id,
      llm_response_id: responseB!.id,
      type: "factual_error",
      severity: "critical",
      summary: "Secret de B",
      evidence: "preuve B",
    });

    await admin.from("scores").insert({ brand_id: brandB!.id, week_number: 1, year: 2026, global_score: 42 });
    await admin
      .from("reports")
      .insert({ brand_id: brandB!.id, month: 1, year: 2026, pdf_url: "https://example.com/secret-b.pdf" });
    await admin.from("account_deletion_requests").insert({ profile_id: uidB });

    console.log("\nConnexion en tant que A (session réelle, comme un vrai navigateur)...");
    const clientA = await sessionClientFor(emailA);

    console.log("\n--- Tests d'isolation en LECTURE (A tente de lire les données de B) ---");

    const checkEmpty = async (label: string, data: unknown[] | null) => {
      record(`Isolation lecture — ${label}`, (data?.length ?? 0) === 0, `${data?.length ?? 0} ligne(s) visible(s)`);
    };

    await checkEmpty("profiles (fiche de B)", (await clientA.from("profiles").select("*").eq("id", uidB)).data);
    await checkEmpty("brands (marque de B)", (await clientA.from("brands").select("*").eq("id", brandB!.id)).data);
    await checkEmpty(
      "truth_sheets (fiche de vérité de B)",
      (await clientA.from("truth_sheets").select("*").eq("brand_id", brandB!.id)).data
    );
    await checkEmpty(
      "subscriptions (abonnement de B)",
      (await clientA.from("subscriptions").select("*").eq("profile_id", uidB)).data
    );
    await checkEmpty("agencies (agence de B)", (await clientA.from("agencies").select("*").eq("id", agencyB!.id)).data);
    await checkEmpty(
      "brand_prompts (prompts de B)",
      (await clientA.from("brand_prompts").select("*").eq("brand_id", brandB!.id)).data
    );
    await checkEmpty(
      "llm_responses (réponses IA de B)",
      (await clientA.from("llm_responses").select("*").eq("brand_id", brandB!.id)).data
    );
    await checkEmpty("anomalies (anomalies de B)", (await clientA.from("anomalies").select("*").eq("brand_id", brandB!.id)).data);
    await checkEmpty("scores (scores de B)", (await clientA.from("scores").select("*").eq("brand_id", brandB!.id)).data);
    await checkEmpty("reports (rapports de B)", (await clientA.from("reports").select("*").eq("brand_id", brandB!.id)).data);
    await checkEmpty(
      "account_deletion_requests (demande de B)",
      (await clientA.from("account_deletion_requests").select("*").eq("profile_id", uidB)).data
    );

    console.log("\n--- Tests d'escalade en ÉCRITURE (A tente de modifier sa propre ligne au-delà de ce qui est prévu) ---");

    const { data: brandA } = await admin
      .from("brands")
      .insert({ owner_id: uidA, name: "Marque A (test isolation)", status: "trial", plan: "essentiel" })
      .select("id")
      .single();
    const { data: agencyA } = await admin
      .from("agencies")
      .insert({ owner_id: uidA, name: "Agence A (test isolation)" })
      .select("id")
      .single();

    const { error: planEscalationError } = await clientA
      .from("brands")
      .update({ plan: "agence", status: "active" })
      .eq("id", brandA!.id);
    const { data: brandAAfter } = await admin.from("brands").select("plan, status").eq("id", brandA!.id).single();
    const planBlocked = brandAAfter?.plan === "essentiel" && brandAAfter?.status === "trial";
    record(
      "Anti-escalade — un client ne peut pas changer son propre plan/statut de marque",
      planBlocked,
      planEscalationError ? `bloqué : ${planEscalationError.message}` : `résultat après tentative : plan=${brandAAfter?.plan}, status=${brandAAfter?.status}`
    );

    const { error: logoLeakError } = await clientA
      .from("agencies")
      .update({ logo_url: "agence-b-secrete/logo.png" })
      .eq("id", agencyA!.id);
    const { data: agencyAAfter } = await admin.from("agencies").select("logo_url").eq("id", agencyA!.id).single();
    const logoBlocked = agencyAAfter?.logo_url !== "agence-b-secrete/logo.png";
    record(
      "Anti-fuite — un client ne peut pas pointer son logo vers le fichier privé d'une autre agence",
      logoBlocked,
      logoLeakError ? `bloqué : ${logoLeakError.message}` : `logo_url après tentative : ${agencyAAfter?.logo_url}`
    );
  } finally {
    console.log("\nNettoyage des comptes de test jetables...");
    await admin.auth.admin.deleteUser(uidA);
    await admin.auth.admin.deleteUser(uidB);
  }

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} tests passés.`);
  if (failed.length > 0) {
    console.log("\nÉCHECS :");
    failed.forEach((f) => console.log(`- ${f.test}`));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
