import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/produits`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/cart`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${baseUrl}/checkout`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${baseUrl}/legal/cgv`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/legal/conditions-d-utilisation`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/legal/mentions-legales`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/legal/politique-de-confidentialite`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/legal/politique-de-cookies`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // Dynamic product pages
  const products = await prisma.product.findMany({ select: { id: true } });
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
