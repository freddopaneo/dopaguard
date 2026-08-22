// Réévalue les scans gratuits déjà terminés avec la grille de jugement à jour
// (qui distingue "l'IA ne vous connaît pas" d'une vraie anomalie).
//
// N'interroge JAMAIS les IA scannées : les réponses brutes sont déjà stockées en
// base, seul le juge est rappelé. Idempotent — relancer le script recalcule
// simplement les mêmes écarts, sans jamais dupliquer de ligne.
//
// Usage : npm run rejudge:free-scans                     (aperçu de tous, n'écrit rien)
//         npm run rejudge:free-scans -- --write          (applique à tous)
//         npm run rejudge:free-scans -- --brand=Denis    (limite à une marque)

process.loadEnvFile(".env.local");

import { createClient } from "@supabase/supabase-js";
import { judgeResponse } from "../lib/scan/judge";

const WRITE = process.argv.includes("--write");
const BRAND = process.argv.find((a) => a.startsWith("--brand="))?.split("=")[1];

interface StoredResponse {
  provider: string;
  category: string;
  responseText: string | null;
  flags: { type: string; excerpt: string; explanation: string }[];
  error: string | null;
}

async function main() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let query = supabase
    .from("free_scans")
    .select("id, brand_name, results")
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (BRAND) query = query.ilike("brand_name", `%${BRAND}%`);

  const { data: scans, error } = await query;

  if (error) throw new Error(error.message);

  console.log(`${scans?.length ?? 0} scan(s) terminé(s).${WRITE ? "" : "  [APERÇU — aucune écriture]"}\n`);

  for (const scan of scans ?? []) {
    const responses = (scan.results as { responses?: StoredResponse[] } | null)?.responses;
    if (!Array.isArray(responses)) {
      console.log(`- ${scan.brand_name} : aucun rapport exploitable, ignoré.`);
      continue;
    }

    const updated: StoredResponse[] = [];
    let absent = 0;
    let anomalies = 0;

    for (const response of responses) {
      if (response.error || !response.responseText) {
        updated.push(response);
        continue;
      }
      const verdict = await judgeResponse(scan.brand_name as string, response.responseText);
      absent += verdict.flags.filter((f) => f.type === "information_absente").length;
      anomalies += verdict.flags.filter((f) => f.type !== "information_absente").length;
      updated.push({ ...response, flags: verdict.flags });
    }

    console.log(`- ${scan.brand_name} : ${anomalies} anomalie(s), ${absent} signal(aux) de non-connaissance.`);

    if (WRITE) {
      const { error: updateError } = await supabase
        .from("free_scans")
        .update({ results: { ...(scan.results as object), responses: updated } })
        .eq("id", scan.id);
      if (updateError) console.log(`    ⚠ échec de l'écriture : ${updateError.message}`);
    }
  }

  console.log(WRITE ? "\nTerminé, base mise à jour." : "\nAperçu terminé. Relancer avec --write pour appliquer.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
