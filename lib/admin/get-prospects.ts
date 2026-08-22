import { createAdminClient } from "@/lib/supabase/admin";

export interface ProspectRow {
  id: string;
  email: string;
  brandName: string;
  website: string | null;
  status: string;
  /** Le scan a-t-il produit un rapport consultable ? */
  hasReport: boolean;
  /** Nombre d'ecarts detectes par le juge, null si aucun rapport. */
  flaggedCount: number | null;
  /** Deduit en croisant l'email avec les abonnes -- la colonne free_scans.converted
   *  existe en base mais n'est renseignee par aucun code, on ne s'y fie pas. */
  isCustomer: boolean;
  createdAt: string;
}

interface ScanResponse {
  flags?: unknown[];
}

function countFlags(results: unknown): number | null {
  const responses = (results as { responses?: ScanResponse[] } | null)?.responses;
  if (!Array.isArray(responses)) return null;
  return responses.reduce((total, response) => total + (response.flags?.length ?? 0), 0);
}

export interface ProspectsResult {
  prospects: ProspectRow[];
  /** Message technique si la lecture a echoue -- affiche tel quel dans l'admin
   *  plutot que de laisser croire a une liste vide. */
  error: string | null;
}

// Service_role : lit tous les scans gratuits et tous les comptes, reserve a
// l'espace admin (jamais appele sans verification prealable de
// profiles.role = 'admin' dans app/admin/layout.tsx).
export async function getProspects(): Promise<ProspectsResult> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      prospects: [],
      error:
        "Variables d'environnement Supabase absentes sur ce déploiement (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const admin = createAdminClient();

  const [scansResult, profilesResult] = await Promise.all([
    admin
      .from("free_scans")
      .select("id, email, brand_name, website, status, results, created_at")
      .order("created_at", { ascending: false }),
    // Un compte n'existe que s'il y a eu paiement (cree par le webhook Stripe),
    // donc la presence d'un profil suffit a marquer un prospect comme client.
    admin.from("profiles").select("email"),
  ]);

  if (scansResult.error) {
    return { prospects: [], error: scansResult.error.message };
  }

  const customerEmails = new Set(
    (profilesResult.data ?? [])
      .map((profile: { email: string | null }) => profile.email?.toLowerCase())
      .filter((email): email is string => Boolean(email)),
  );

  const prospects = (scansResult.data ?? []).map((row: Record<string, unknown>) => {
    const email = row.email as string;
    const flaggedCount = countFlags(row.results);

    return {
      id: row.id as string,
      email,
      brandName: row.brand_name as string,
      website: (row.website as string | null) ?? null,
      status: row.status as string,
      hasReport: flaggedCount !== null,
      flaggedCount,
      isCustomer: customerEmails.has(email.toLowerCase()),
      createdAt: row.created_at as string,
    };
  });

  return { prospects, error: null };
}
