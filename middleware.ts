import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraîchit la session Supabase (cookies) à chaque requête. Sans ceci, les
// Server Components (toutes les pages /dashboard/*) ne peuvent jamais réécrire
// le cookie de session -- une fois le jeton d'accès expiré (par défaut ~1h chez
// Supabase), le client est déconnecté silencieusement et doit redemander un lien
// de connexion, même si son jeton de rafraîchissement (valide plusieurs semaines)
// aurait normalement permis de rester connecté.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Déclenche le rafraîchissement du jeton si nécessaire et réécrit le cookie
  // sur la réponse -- doit être appelé avant tout retour anticipé.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
