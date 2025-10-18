import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(products, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Error fetching products", err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
