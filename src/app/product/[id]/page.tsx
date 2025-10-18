import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SEO, productJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/components/SEO";

type PageProps = {
  params: Promise<{ id: string }>; // Next.js 15 with async params, also works in 14 when used as await
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      <SEO>
        {jsonLdScript(
          productJsonLd({
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            price: product.price,
            currency: "EUR",
            availability: product.stock > 0 ? "InStock" : "OutOfStock",
            url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/product/${product.id}`,
          })
        )}
        {jsonLdScript(
          breadcrumbJsonLd([
            { name: "Accueil", url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" },
            { name: "Produits", url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/produits` },
            { name: product.name, url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/product/${product.id}` },
          ])
        )}
      </SEO>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="rounded-lg overflow-hidden border border-emerald-100 bg-white">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-black/70 dark:text-white/70">{product.description}</p>
          <div className="text-2xl font-semibold">{formatPrice(product.price)}</div>
          <div className="mt-2">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, select: { name: true, description: true } });
  if (!product) return { title: "Produit introuvable" };
  const desc = product.description?.slice(0, 160);
  return {
    title: product.name,
    description: desc,
  };
}
