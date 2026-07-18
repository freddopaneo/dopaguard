import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Aucune interface ne permet à un client de s'attribuer ce rôle (colonne non
  // ouverte en écriture cliente, cf. migration 0021) -- uniquement modifiable en
  // base directement par nous. Redirection silencieuse vers le dashboard normal
  // pour ne pas révéler l'existence de cet espace à un compte non-admin.
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-dopaguard-navyDark text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"} — Admin</span>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-xs text-white/50 underline underline-offset-2 hover:text-white/80">
            Se déconnecter
          </button>
        </form>
      </div>

      <AdminNav />

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
