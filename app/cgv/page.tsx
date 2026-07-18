import { LegalLayout } from "@/components/legal/LegalLayout";

export default function CgvPage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard";

  return (
    <LegalLayout title="Conditions générales de vente">
      <section>
        <h2 className="font-semibold text-dopaguard-navy">Objet</h2>
        <p>
          {appName} est un service édité par Dopaneo.ai, qui surveille automatiquement et périodiquement ce que les
          principales intelligences artificielles génératives (ChatGPT, Claude, Gemini, Perplexity, Mistral) disent
          d&apos;une marque, et alerte son client en cas d&apos;anomalie.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Plans et tarifs</h2>
        <p>
          {appName} propose trois formules mensuelles : Essentiel (69 €/mois), Pro (149 €/mois) et Agence (349
          €/mois, jusqu&apos;à 10 marques). Chaque formule inclut un essai de 14 jours, une carte bancaire étant
          demandée dès l&apos;inscription.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Paiement et renouvellement</h2>
        <p>
          Le paiement est prélevé automatiquement chaque mois via Stripe. L&apos;abonnement se renouvelle
          automatiquement à chaque échéance, sauf résiliation préalable.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Résiliation</h2>
        <p>
          Vous pouvez résilier votre abonnement à tout moment depuis votre espace client (Paramètres → Gérer ma
          facturation). La résiliation prend effet à la fin de la période déjà payée ; aucun remboursement au
          prorata n&apos;est effectué pour la période en cours.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Responsabilité</h2>
        <p>
          {appName} restitue et analyse les réponses fournies par des intelligences artificielles tierces, sur
          lesquelles Dopaneo.ai n&apos;a aucun contrôle. Dopaneo.ai ne garantit ni l&apos;exactitude, ni la
          disponibilité, ni le comportement de ces services tiers, et ne saurait être tenue responsable de leur
          contenu.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Droit applicable</h2>
        <p>Les présentes conditions sont soumises au droit français. Tout litige relève des tribunaux compétents de Paris.</p>
      </section>
    </LegalLayout>
  );
}
