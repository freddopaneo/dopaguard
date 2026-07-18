import { LegalLayout } from "@/components/legal/LegalLayout";

export default function ConfidentialitePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Dopaguard";

  return (
    <LegalLayout title="Politique de confidentialité">
      <section>
        <h2 className="font-semibold text-dopaguard-navy">Responsable du traitement</h2>
        <p>
          Dopaneo.ai, 136 rue Amelot, 75011 Paris — <a href="mailto:contact@dopaneo.ai">contact@dopaneo.ai</a>.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Données collectées</h2>
        <p>
          Selon votre usage de {appName} : votre email professionnel, le nom et le site web de votre marque, son
          secteur d&apos;activité, les faits que vous validez dans votre fiche de vérité, et les réponses des IA
          interrogées à son sujet. Les données de facturation (carte bancaire) sont saisies et conservées
          directement par Stripe — nous ne les stockons jamais.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Finalités et base légale</h2>
        <p>
          Ces données sont utilisées pour fournir le service (scan gratuit, surveillance hebdomadaire, alertes,
          rapports), gérer la facturation et répondre à vos demandes de support. Le traitement repose sur
          l&apos;exécution du contrat pour un compte payant, et sur votre consentement explicite pour le scan
          gratuit.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Destinataires des données</h2>
        <p>Vos données peuvent être transmises aux prestataires suivants, chacun lié par son propre contrat de sous-traitance :</p>
        <ul className="ml-4 list-disc">
          <li>Supabase (hébergement de la base de données et authentification)</li>
          <li>Vercel (hébergement applicatif)</li>
          <li>Resend (envoi des emails transactionnels)</li>
          <li>Stripe (paiement et facturation)</li>
          <li>OpenAI, Anthropic, Google, Perplexity, Mistral (IA interrogées dans le cadre du service de surveillance)</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Durée de conservation</h2>
        <p>
          Vos données sont conservées pendant toute la durée de votre compte. En cas de demande de suppression,
          elles sont effacées sous 30 jours.
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression,
          d&apos;opposition et de portabilité sur vos données. Vous pouvez les exercer à tout moment en écrivant à{" "}
          <a href="mailto:contact@dopaneo.ai">contact@dopaneo.ai</a>, ou demander la suppression de votre compte
          directement depuis votre espace client (Paramètres).
        </p>
      </section>

      <section>
        <h2 className="font-semibold text-dopaguard-navy">Cookies</h2>
        <p>
          Nous n&apos;utilisons aucun cookie publicitaire ou de suivi. Seul un cookie technique, nécessaire au
          maintien de votre connexion, est déposé lorsque vous êtes connecté à votre espace client.
        </p>
      </section>
    </LegalLayout>
  );
}
