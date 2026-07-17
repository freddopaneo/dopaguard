import { Resend } from "resend";
import { ANOMALY_TYPE_LABELS } from "@/lib/anomalies";
import { PROVIDER_SHORT_LABELS as PROVIDER_LABELS } from "@/lib/providers";

function magicLinkEmailHtml(brandName: string, verifyUrl: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #133742;">
      <h1 style="font-size: 20px;">Confirmez votre scan gratuit</h1>
      <p>Bonjour,</p>
      <p>
        Cliquez sur le bouton ci-dessous pour vérifier votre email et lancer le scan
        gratuit de <strong>${brandName}</strong> dans les principales IA génératives.
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="${verifyUrl}"
          style="background: #c7ff98; color: #133742; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >
          Vérifier mon email
        </a>
      </p>
      <p style="font-size: 13px; color: #1e4d5e;">
        Ce lien expire dans 30 minutes. Si vous n'êtes pas à l'origine de cette demande,
        vous pouvez ignorer cet email.
      </p>
    </div>
  `;
}

export async function sendMagicLinkEmail({
  to,
  brandName,
  verifyUrl,
}: {
  to: string;
  brandName: string;
  verifyUrl: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Confirmez votre scan gratuit pour ${brandName}`,
    html: magicLinkEmailHtml(brandName, verifyUrl),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}

function loginLinkEmailHtml(loginUrl: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #133742;">
      <h1 style="font-size: 20px;">Votre lien de connexion Dopaguard</h1>
      <p>Bonjour,</p>
      <p>
        Cliquez sur le bouton ci-dessous pour vous connecter à votre compte Dopaguard.
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="${loginUrl}"
          style="background: #c7ff98; color: #133742; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >
          Me connecter
        </a>
      </p>
      <p style="font-size: 13px; color: #1e4d5e;">
        Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande,
        vous pouvez ignorer cet email.
      </p>
    </div>
  `;
}

export async function sendLoginLinkEmail({ to, loginUrl }: { to: string; loginUrl: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: "Votre lien de connexion Dopaguard",
    html: loginLinkEmailHtml(loginUrl),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}

function criticalAlertEmailHtml(
  brandName: string,
  anomaly: { type: string; summary: string; evidence: string },
  llmProvider: string,
  dashboardUrl: string
): string {
  const typeLabel = ANOMALY_TYPE_LABELS[anomaly.type] ?? anomaly.type;
  const providerLabel = PROVIDER_LABELS[llmProvider] ?? llmProvider;

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #133742;">
      <h1 style="font-size: 20px; color: #EF4444;">Anomalie critique détectée</h1>
      <p>Bonjour,</p>
      <p>
        Une anomalie critique vient d'être détectée pour <strong>${brandName}</strong>, dans une réponse de <strong>${providerLabel}</strong>.
      </p>
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 8px; font-weight: 600;">${typeLabel}</p>
        <p style="margin: 0 0 8px;">${anomaly.summary}</p>
        <p style="margin: 0; font-size: 13px; color: #1e4d5e; font-style: italic;">« ${anomaly.evidence} »</p>
      </div>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="${dashboardUrl}"
          style="background: #c7ff98; color: #133742; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >
          Voir mon espace Dopaguard
        </a>
      </p>
    </div>
  `;
}

export async function sendCriticalAlertEmail({
  to,
  brandName,
  anomaly,
  llmProvider,
  dashboardUrl,
}: {
  to: string;
  brandName: string;
  anomaly: { type: string; summary: string; evidence: string };
  llmProvider: string;
  dashboardUrl: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Anomalie critique détectée pour ${brandName}`,
    html: criticalAlertEmailHtml(brandName, anomaly, llmProvider, dashboardUrl),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}

function scoreDeltaLabel(score: number, previousScore: number | null): string {
  if (previousScore === null) return "";
  const delta = score - previousScore;
  if (delta > 0) return `<span style="color: #10B981;">▲ +${delta} vs semaine précédente</span>`;
  if (delta < 0) return `<span style="color: #EF4444;">▼ ${delta} vs semaine précédente</span>`;
  return `<span style="color: #1e4d5e;">= stable vs semaine précédente</span>`;
}

function weeklyDigestEmailHtml(
  brandName: string,
  score: number,
  previousScore: number | null,
  topAnomalies: { type: string; severity: string; summary: string }[],
  dashboardUrl: string
): string {
  const anomaliesHtml =
    topAnomalies.length > 0
      ? topAnomalies
          .map(
            (a) => `
        <li style="margin-bottom: 8px;">
          <strong>${ANOMALY_TYPE_LABELS[a.type] ?? a.type}</strong> (${a.severity}) — ${a.summary}
        </li>`
          )
          .join("")
      : `<li>Aucune anomalie cette semaine.</li>`;

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #133742;">
      <h1 style="font-size: 20px;">Votre bilan hebdomadaire</h1>
      <p>Bonjour,</p>
      <p>Voici ce que les IA ont dit de <strong>${brandName}</strong> cette semaine.</p>
      <div style="background: #fafaf7; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 36px; font-weight: 700;">${score}<span style="font-size: 16px; color: #1e4d5e;">/100</span></p>
        <p style="margin: 4px 0 0; font-size: 14px;">${scoreDeltaLabel(score, previousScore)}</p>
      </div>
      <p style="font-weight: 600;">Anomalies principales de la semaine :</p>
      <ul style="padding-left: 20px;">${anomaliesHtml}</ul>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="${dashboardUrl}"
          style="background: #c7ff98; color: #133742; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >
          Voir mon espace Dopaguard
        </a>
      </p>
    </div>
  `;
}

export async function sendWeeklyDigestEmail({
  to,
  brandName,
  score,
  previousScore,
  topAnomalies,
  dashboardUrl,
}: {
  to: string;
  brandName: string;
  score: number;
  previousScore: number | null;
  topAnomalies: { type: string; severity: string; summary: string }[];
  dashboardUrl: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Votre bilan hebdomadaire Dopaguard — ${brandName}`,
    html: weeklyDigestEmailHtml(brandName, score, previousScore, topAnomalies, dashboardUrl),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}

function monthlyReportEmailHtml(brandName: string, monthLabel: string, pdfUrl: string, dashboardUrl: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #133742;">
      <h1 style="font-size: 20px;">Votre rapport mensuel est prêt</h1>
      <p>Bonjour,</p>
      <p>
        Le rapport de réputation IA de <strong>${brandName}</strong> pour <strong>${monthLabel}</strong> est disponible.
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="${pdfUrl}"
          style="background: #c7ff98; color: #133742; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;"
        >
          Télécharger le rapport PDF
        </a>
      </p>
      <p style="text-align: center; font-size: 13px;">
        <a href="${dashboardUrl}" style="color: #1e4d5e;">Voir mon espace Dopaguard</a>
      </p>
    </div>
  `;
}

export async function sendMonthlyReportEmail({
  to,
  brandName,
  monthLabel,
  pdfUrl,
  dashboardUrl,
}: {
  to: string;
  brandName: string;
  monthLabel: string;
  pdfUrl: string;
  dashboardUrl: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `Votre rapport mensuel Dopaguard — ${brandName} (${monthLabel})`,
    html: monthlyReportEmailHtml(brandName, monthLabel, pdfUrl, dashboardUrl),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}
