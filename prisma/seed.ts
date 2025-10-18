import { PrismaClient } from "../src/generated/prisma";

// Prefer direct (non-pooled) connection for migrations/seeding to avoid pooler limitations
const datasourceUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient(
  datasourceUrl
    ? // Recent Prisma supports passing a datasource URL override at top-level
      // https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasourceurl
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ datasourceUrl } as any)
    : undefined
);

async function main() {
  console.log("Seeding database...", {
    provider: "postgresql",
    hasDatabaseUrl: !!process.env.DATABASE_URL,
  });
  // Optionally clear existing data for a clean seed
  await prisma.product.deleteMany({});

  const products = [
    {
      name: "Baguette Tradition",
      description: "Pain traditionnel croustillant, pétri quotidiennement.",
      price: 1.2,
      imageUrl: "/images_le_petit_marché/tradition_bread.jpeg",
      category: "Boulangerie",
      stock: 120,
      featured: true,
    },
    {
      name: "Croissant Beurre",
      description: "Croissant pur beurre feuilleté et doré au four.",
      price: 1.5,
      imageUrl: "/images_le_petit_marché/croissants.jpeg",
      category: "Boulangerie",
      stock: 80,
    },
    {
      name: "Tomates Bio",
      description: "Tomates fraîches et juteuses issues de l'agriculture biologique.",
      price: 2.99,
      imageUrl: "/images_le_petit_marché/tomatoes_bio.jpeg",
      category: "Fruits & Légumes",
      stock: 60,
      featured: true,
    },
    {
      name: "Fromage de Chèvre",
      description: "Fromage de chèvre artisanal, goût doux et crémeux.",
      price: 4.5,
      imageUrl: "/images_le_petit_marché/goat.jpeg",
      category: "Crèmerie",
      stock: 35,
    },
    {
      name: "Confiture Fraise Maison",
      description: "Confiture de fraise cuite au chaudron, recette familiale.",
      price: 3.9,
      imageUrl: "/images_le_petit_marché/jam_straw.jpeg",
      category: "Épicerie",
      stock: 50,
    },
    {
      name: "Pâtes Artisanales",
      description: "Pâtes sèches artisanales au blé dur, cuisson al dente.",
      price: 2.5,
      imageUrl: "/images_le_petit_marché/pastas.webp",
      category: "Épicerie",
      stock: 100,
    },
    {
      name: "Pommes Locales",
      description: "Pommes croquantes issues de vergers locaux.",
      price: 2.1,
      imageUrl: "/images_le_petit_marché/apples.jpeg",
      category: "Fruits & Légumes",
      stock: 70,
    },
    {
      name: "Bananes",
      description: "Bananes mûries naturellement, sucrées et fondantes.",
      price: 1.8,
      imageUrl: "/images_le_petit_marché/bananes.jpeg",
      category: "Fruits & Légumes",
      stock: 90,
      featured: true,
    },
  ];

  const result = await prisma.product.createMany({ data: products });
  console.log(`Seed terminé: ${result.count} produits insérés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
