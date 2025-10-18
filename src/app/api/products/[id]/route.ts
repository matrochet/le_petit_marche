import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/:id
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> } // supports async params resolution
) {
  try {
    const { id } = await context.params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Paramètre 'id' manquant ou invalide" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("[GET /api/products/:id]", err);
    return NextResponse.json(
      { error: "Erreur interne serveur" },
      { status: 500 }
    );
  }
}
