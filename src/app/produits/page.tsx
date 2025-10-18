import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "@/components/add-to-cart-button";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export const metadata = {
  title: "Tous les produits | Le Petit Marché",
  description: "Découvrez l'ensemble de nos produits frais et locaux.",
};

// Avoid build-time prerender and tolerate missing DB in serverless
export const dynamic = "force-dynamic";

export default async function ProduitsPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = (await searchParams) || {};
  const category = typeof params.category === "string" ? params.category : undefined;
  const where = category ? { category } : undefined;
  let products: Array<{ id: string; name: string; imageUrl: string; price: number; category: string }> = [];
  let distinctCategories: string[] = [];
  try {
    const [p, cats] = await Promise.all([
      prisma.product.findMany({ where, orderBy: { name: "asc" } }),
      prisma.product.findMany({ select: { category: true } }),
    ]);
    products = p;
    distinctCategories = Array.from(new Set(cats.map((c) => c.category))).sort();
  } catch (err) {
    console.warn("[produits] DB unavailable, rendering empty state:", (err as Error)?.message || err);
  }

  return (
    <div className="min-h-screen">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{category ? category : "Tous les produits"}</h1>
          <p className="text-sm text-black/60">{category ? "Filtré par catégorie" : "L'épicerie au complet, à portée de clic."}</p>
        </div>
        <Link href="/" className="hidden sm:inline-flex items-center text-sm text-emerald-700 hover:underline">Retour accueil</Link>
      </div>

      {/* Filtres catégories */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/produits" className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${!category ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}>Toutes</Link>
        {distinctCategories.map((c) => (
          <Link key={c} href={`/produits?category=${encodeURIComponent(c)}`} className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${category === c ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"}`}>{c}</Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-emerald-100 rounded-lg shadow-sm flex flex-col hover:shadow-md transition-shadow overflow-hidden">
            <Link href={`/product/${p.id}`} className="block">
              <Image
                src={p.imageUrl}
                alt={p.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4 flex-1 flex flex-col gap-1">
              <div className="mb-1 flex flex-wrap gap-2 text-[11px]">
                {/(bio|organic)/i.test(p.name) || /(bio|organic)/i.test(p.category) ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5">Bio</span>
                ) : null}
                {/local/i.test(p.name) || /local/i.test(p.category) ? (
                  <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-800 px-2 py-0.5">Local</span>
                ) : null}
                {/promo|offre|promo/i.test(p.name) || /promo|offre/i.test(p.category) ? (
                  <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">Promo</span>
                ) : null}
              </div>
              <Link href={`/product/${p.id}`} className="hover:underline">
                <h2 className="font-semibold text-lg leading-tight">{p.name}</h2>
              </Link>
              <p className="text-sm text-black/60">{p.category}</p>
              <div className="mt-auto pt-2 font-medium">{formatPrice(p.price)}</div>
            </div>
            <div className="p-4 pt-0">
              <AddToCartButton
                product={{ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
