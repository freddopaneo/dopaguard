import { createAdminClient } from "@/lib/supabase/admin";
import { sendLoginLinkEmail } from "@/lib/email/resend";
import { getAppUrl } from "@/lib/app-url";

// Génère un lien de connexion Supabase (sans déclencher l'email natif de Supabase)
// et l'envoie via Resend, pour garder une marque et un expéditeur cohérents.
export async function sendLoginLink(email: string): Promise<void> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (error || !data.properties?.hashed_token) {
    throw new Error(error?.message || "Échec de génération du lien de connexion.");
  }

  const loginUrl = `${getAppUrl()}/auth/confirm?token_hash=${data.properties.hashed_token}&type=magiclink`;

  await sendLoginLinkEmail({ to: email, loginUrl });
}
