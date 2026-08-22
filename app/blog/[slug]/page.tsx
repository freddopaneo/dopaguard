import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, getArticleBySlug } from "@/lib/blog/articles";
import { ARTICLE_COMPONENTS } from "@/content/blog";
import { BlogLayout } from "@/components/blog/BlogLayout";
import { getAppUrl } from "@/lib/app-url";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const meta = getArticleBySlug(params.slug);
  if (!meta) return {};

  const url = `${getAppUrl()}/blog/${meta.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      publishedTime: meta.publishedAt,
    },
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const meta = getArticleBySlug(params.slug);
  const ArticleBody = ARTICLE_COMPONENTS[params.slug];

  if (!meta || !ArticleBody) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    author: { "@type": "Organization", name: "Dopaguard" },
    publisher: { "@type": "Organization", name: "Dopaguard" },
    mainEntityOfPage: `${getAppUrl()}/blog/${meta.slug}`,
  };

  return (
    <BlogLayout meta={meta}>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD statique, aucune donnée utilisateur. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleBody />
    </BlogLayout>
  );
}
