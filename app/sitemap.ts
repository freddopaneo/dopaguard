import type { MetadataRoute } from "next";
import { getAppUrl } from "@/lib/app-url";
import { BLOG_ARTICLES } from "@/lib/blog/articles";
import { VERTICALS } from "@/lib/verticals";
import { CITIES } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl();

  const staticPages: MetadataRoute.Sitemap = [
    { url: appUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${appUrl}/secteurs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${appUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${appUrl}/glossaire`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${appUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${appUrl}/cgv`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${appUrl}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articlePages: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${appUrl}/blog/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const verticalPages: MetadataRoute.Sitemap = VERTICALS.map((vertical) => ({
    url: `${appUrl}/secteurs/${vertical.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const cityVerticalPages: MetadataRoute.Sitemap = VERTICALS.flatMap((vertical) =>
    CITIES.map((city) => ({
      url: `${appUrl}/secteurs/${vertical.slug}/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...verticalPages, ...cityVerticalPages, ...articlePages];
}
