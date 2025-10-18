import React from "react";
import type { Metadata } from "next";

type JsonLd = Record<string, unknown>;

export function jsonLdScript(data: JsonLd) {
  const json = JSON.stringify(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function websiteJsonLd({
  name,
  url,
  potentialAction = true,
}: { name: string; url: string; potentialAction?: boolean }): JsonLd {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };
  if (potentialAction) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: `${url}/produits?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }
  return data;
}

export function organizationJsonLd({
  name,
  url,
  logo,
}: { name: string; url: string; logo?: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo ? { logo } : {}),
  };
}

export function productJsonLd(p: {
  name: string;
  description?: string | null;
  image: string;
  sku?: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description || undefined,
    image: [p.image],
    sku: p.sku,
    offers: {
      "@type": "Offer",
      url: p.url,
      priceCurrency: p.currency || "EUR",
      price: p.price.toFixed(2),
      availability: `https://schema.org/${p.availability || "InStock"}`,
    },
  } as JsonLd;
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function buildPageMetadata({
  title,
  description,
  images,
}: { title: string; description?: string; images?: string[] }): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  } satisfies Metadata;
}

export function SEO({ children }: { children: React.ReactNode }) {
  // Simple pass-through wrapper if we need to toggle rendering later
  return <>{children}</>;
}
