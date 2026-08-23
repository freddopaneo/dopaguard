import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { noStoreFetch } from "@/lib/supabase/no-store-fetch";

// Client Supabase lié aux cookies Next.js : lit/pose la session de l'utilisateur connecté.
// Usage : Route Handlers et pages serveur (jamais côté client, jamais avec la clé service_role).
export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    // Meme raison que pour le client admin : une session ou un role lu depuis un
    // cache perime n'est pas seulement faux, il est potentiellement dangereux.
    global: { fetch: noStoreFetch },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Appelé depuis un Server Component (lecture seule) : sans effet, la session
          // reste valide tant qu'un Route Handler la rafraîchit lors du prochain appel.
        }
      },
    },
  });
}
