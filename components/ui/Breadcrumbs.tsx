import { getAppUrl } from "@/lib/app-url";

export interface BreadcrumbItem {
  label: string;
  /** Chemin absolu (ex. "/secteurs"). Omis pour la page courante (dernier élément). */
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const appUrl = getAppUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${appUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className="text-xs text-dopaguard-navyMid/60">
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-dopaguard-navyMid hover:underline">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-dopaguard-navyMid/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
