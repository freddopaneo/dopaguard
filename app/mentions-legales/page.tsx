import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Dopaguard, édité par Dopaneo.ai.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales">
      <section>
        <h2 className="font-semibold text-dopaguard-navy">Éditeur du site</h2>
        <p>
          Le site et le service {process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard"} sont édités par la société{" "}
          <strong>DOPANEO.AI</strong>, SAS (société par actions simplifiée) au capital social de 1 000 €,
          immatriculée sous le SIREN 100 247 600 (SIRET 100 247 600 00016), n° TVA intracommunautaire
          FR35 100 247 600, dont le siège social est situé au 136 rue Amelot, 75011 Paris, France.
        </p>
        <p>Représentants légaux : Frédéric Dubois et Frédéric Dupeyron.</p>
        <p>
          Contact : <a href="mailto:contact@dopaneo.ai">contact@dopaneo.ai</a>
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc. (États-Unis) — <a href="https://vercel.com">vercel.com</a>. La base de
          données et l&apos;authentification sont hébergées par Supabase.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Directeur de la publication</h2>
        <p>Frédéric Dubois.</p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, marque, logo) est la propriété de Dopaneo.ai,
          sauf mention contraire, et ne peut être reproduit sans autorisation préalable.
        </p>
      </section>
    </LegalLayout>
  );
}
