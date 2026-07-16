import { Resend } from "resend";

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
