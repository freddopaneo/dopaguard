import { getProspects } from "@/lib/admin/get-prospects";
import { ProspectsTable } from "@/components/admin/ProspectsTable";

// Sans cela, Next.js met en cache les appels Supabase sous-jacents et la page peut
// servir indefiniment un premier resultat (piege deja rencontre sur les routes de
// scan). Un espace d'administration doit toujours lire la donnee fraiche.
export const dynamic = "force-dynamic";

export default async function AdminProspectsPage() {
  const { prospects, error } = await getProspects();

  if (error) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-semibold text-white">Prospects — scans gratuits</h1>
        <div className="rounded-2xl border border-dopaguard-critical/40 bg-dopaguard-critical/10 p-5">
          <p className="text-sm font-medium text-white">La liste n&apos;a pas pu être chargée.</p>
          <p className="mt-2 text-xs leading-relaxed text-white/60">
            Message technique : {error}
          </p>
        </div>
      </div>
    );
  }

  return <ProspectsTable prospects={prospects} />;
}
