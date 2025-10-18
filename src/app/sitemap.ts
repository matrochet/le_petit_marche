import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

// Avoid static prerender during build since Vercel doesn't have the local SQLite file
export const dynamic = "force-dynamic";

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

  // Dynamic product pages (best-effort): if DB is not reachable (e.g., no SQLite on Vercel), fall back to static routes only
  try {
    const products = await prisma.product.findMany({ select: { id: true } });
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/product/${p.id}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch (err) {
    console.warn("[sitemap] unable to fetch products for sitemap; returning static routes only:", (err as Error)?.message || err);
    return staticRoutes;
  }
}
