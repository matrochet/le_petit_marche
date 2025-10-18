// Map product names to local static images bundled by Next.js
// Note: Folder name contains an accent (marché); keep it exact in import paths.
import baguetteImg from "@/app/images_le_petit_marché/tradition_bread.jpeg";
import croissantImg from "@/app/images_le_petit_marché/croissants.jpeg";
import tomatoesImg from "@/app/images_le_petit_marché/tomatoes_bio.jpeg";
import goatImg from "@/app/images_le_petit_marché/goat.jpeg";
import jamImg from "@/app/images_le_petit_marché/jam_straw.jpeg";
import pastasImgJpeg from "@/app/images_le_petit_marché/pastas.jpeg";
import pastasImgWebp from "@/app/images_le_petit_marché/pastas.webp";
import applesImg from "@/app/images_le_petit_marché/apples.jpeg";
import bananasImg from "@/app/images_le_petit_marché/bananes.jpeg";

export type LocalImage = typeof baguetteImg;

export function getLocalProductImage(name: string): LocalImage | null {
  const k = name.toLowerCase();
  if (k.includes("baguette")) return baguetteImg;
  if (k.includes("croissant")) return croissantImg;
  if (k.includes("tomate")) return tomatoesImg;
  if (k.includes("chèvre") || k.includes("chevre") || k.includes("fromage")) return goatImg;
  if (k.includes("confiture") || k.includes("fraise")) return jamImg;
  if (k.includes("pâte") || k.includes("pates") || k.includes("pâtes") || k.includes("pasta")) {
    // Prefer webp if available
    return pastasImgWebp || pastasImgJpeg;
  }
  if (k.includes("pomme") || k.includes("apple")) return applesImg;
  if (k.includes("banane") || k.includes("banana")) return bananasImg;
  return null;
}
