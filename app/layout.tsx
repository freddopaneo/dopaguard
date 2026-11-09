import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getAppUrl } from "@/lib/app-url";

// Police commune aux sites Dopaneo / Dopageo / Dopaguard : Open Sans, auto-hébergée
// (fichiers variables, licence OFL dans app/fonts). Aucune requête externe.
const openSans = localFont({
  src: [
    { path: "./fonts/open-sans-latin-wght-normal.woff2", weight: "300 800", style: "normal" },
    { path: "./fonts/open-sans-latin-wght-italic.woff2", weight: "300 800", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: {
    default: "Dopaguard",
    template: "%s | Dopaguard",
  },
  description: "Surveillance de réputation de marque dans les LLM",
  openGraph: {
    siteName: "Dopaguard",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${openSans.variable} font-sans antialiased`}>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
