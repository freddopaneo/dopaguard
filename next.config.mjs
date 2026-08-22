/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirection permanente de www vers le domaine sans www. La balise canonique
      // faisait deja le travail, mais Google explorait les deux versions et signalait
      // des doublons dans la Search Console -- une redirection supprime le signal a
      // la source. Traitee par Vercel avant d'atteindre l'application.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dopaguard.ai" }],
        destination: "https://dopaguard.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
