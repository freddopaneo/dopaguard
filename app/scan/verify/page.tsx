import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashToken } from "@/lib/scan/token";

function StatusCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #133742 0%, #0d2e38 100%)" }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-15px_rgba(13,46,56,0.35)]">
        <h1 className="text-xl font-bold text-dopaguard-navy">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-dopaguard-navyMid">{body}</p>
      </div>
    </div>
  );
}

export default async function VerifyScanPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return <StatusCard title="Lien invalide" body="Ce lien de vérification est invalide." />;
  }

  const supabase = createAdminClient();
  const tokenHash = hashToken(token);

  const { data: scan } = await supabase
    .from("free_scans")
    .select("id, status, token_expires_at")
    .eq("verification_token_hash", tokenHash)
    .maybeSingle();

  if (!scan) {
    return (
      <StatusCard
        title="Lien invalide"
        body="Ce lien de vérification n'existe pas ou a déjà été utilisé."
      />
    );
  }

  // Email déjà confirmé (et éventuellement scan déjà en cours ou terminé) : direction la page de résultats.
  if (scan.status !== "pending") {
    redirect(`/scan/${scan.id}`);
  }

  if (!scan.token_expires_at || new Date(scan.token_expires_at) < new Date()) {
    return (
      <StatusCard
        title="Lien expiré"
        body="Ce lien a expiré. Relancez un scan gratuit depuis la page d'accueil."
      />
    );
  }

  await supabase.from("free_scans").update({ status: "verified" }).eq("id", scan.id);

  redirect(`/scan/${scan.id}`);
}
