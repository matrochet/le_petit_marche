import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
// Using public image URLs stored in DB

export const metadata = {
  title: "Accueil",
  description: "Le Petit Marché — produits frais et locaux.",
};

// Ensure this page is never pre-rendered at build time (DB may be unavailable on Vercel during build)
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch data with graceful fallbacks if the database is unavailable (e.g., during static build)
  let featured: Array<{ id: string; name: string; category: string; imageUrl: string }> = [];
  let categories: string[] = [];
  try {
    featured = await prisma.product.findMany({
      where: { featured: true },
      orderBy: { name: "asc" },
      take: 6,
    });
    const all = await prisma.product.findMany({ select: { category: true } });
    categories = Array.from(new Set(all.map((a) => a.category))).sort();
  } catch (err) {
    console.warn("[home] DB not available at build/runtime, rendering with empty lists:", (err as Error)?.message || err);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Colonne texte */}
          <div className="relative max-w-3xl mx-auto text-center sm:text-left md:mx-0">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-900">Des produits frais et locaux, livrés avec le sourire</h1>
            <p className="mt-4 text-base sm:text-lg text-black/80">Le Petit Marché, votre épicerie de quartier en ligne{'\u00A0'}: pains croustillants, fruits & légumes de saison, fromages et douceurs artisanales.</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link href="/produits" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-white font-medium shadow hover:bg-emerald-700">Voir tous les produits</Link>
              <Link href="/cart" className="inline-flex items-center rounded-md border border-emerald-200 bg-white px-5 py-2.5 text-emerald-700 font-medium hover:bg-emerald-50">Mon panier</Link>
            </div>
          </div>
          {/* Colonne image (affichée à partir de sm) */}
          <div className="hidden sm:block">
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image src="/images_le_petit_marché/tomatoes_bio.jpeg" alt="Tomates bio" width={800} height={600} className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes‑nous ? (court) */}
      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-semibold">{"Qui sommes‑nous\u202F?"}</h2>
        <p className="mt-2 text-black/75">
          Une petite équipe de quartier qui privilégie la fraîcheur, la saison et le service humain. <br /> Pas de grand
          {" discours\u00A0: des produits simples, du goût, et une livraison soignée."}
        </p>
      </section>

      {/* Avantages */}
  <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto sm:max-w-none sm:mx-0">
        {[
          { title: "Local et de saison", desc: "Une sélection auprès de producteurs proches pour un goût authentique." },
          { title: "Qualité artisanale", desc: "Du pain au fromage, des recettes faites avec soin et passion." },
          { title: "Simple et rapide", desc: "Commandez en quelques clics, retrait ou livraison selon vos envies." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border bg-white p-4 shadow-sm text-center sm:text-left">
            <h3 className="font-semibold text-emerald-900">{f.title}</h3>
            <p className="text-sm text-black/70 mt-1">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Mise en avant */}
      <section className="mt-10">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Nos coups de cœur</h2>
          <Link href="/produits" className="text-sm text-emerald-700 hover:underline">Tout voir</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto sm:max-w-none sm:mx-0">
          {featured.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group rounded-lg border border-emerald-100 bg-white shadow-sm overflow-hidden hover:shadow-md">
              <Image src={p.imageUrl} alt={p.name} width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-4 text-center sm:text-left">
                <h3 className="font-semibold group-hover:underline">{p.name}</h3>
                <p className="text-sm text-black/60">{p.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="mt-10">
        <div className="mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Explorer par catégories</h2>
          <Link href="/produits" className="text-sm text-emerald-700 hover:underline">Catalogue complet</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto sm:max-w-none sm:mx-0">
          {categories.map((c) => (
            <Link key={c} href={`/produits?category=${encodeURIComponent(c)}`} className="rounded-lg border bg-white p-4 hover:shadow-sm text-center sm:text-left">
              <div className="font-medium text-emerald-900">{c}</div>
              <div className="text-sm text-black/60">Voir les produits</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
