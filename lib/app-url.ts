// En production, VERCEL_URL pointe vers l'URL technique unique du déploiement,
// protégée par l'authentification Vercel — inaccessible à un vrai visiteur anonyme.
// VERCEL_PROJECT_PRODUCTION_URL donne le domaine public stable à utiliser à la place.
export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  );
}
