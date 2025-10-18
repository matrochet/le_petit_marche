import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

type Item = {
  productId: string;
  quantity: number;
};

// Ensure this route is always dynamic and never statically evaluated at build time
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const stripe = getStripe();
    const body = (await req.json()) as { items: Item[] };
    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Validate items against DB and build Stripe line_items
    const ids = [...new Set(body.items.map((i) => i.productId))];
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, price: true },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const line_items: Array<{
      price_data: {
        currency: "eur";
        product_data: { name: string };
        unit_amount: number;
      };
      quantity: number;
      adjustable_quantity?: { enabled: boolean; minimum?: number; maximum?: number };
    }> = [];

    for (const it of body.items) {
      const p = productMap.get(it.productId);
      if (!p) {
        return NextResponse.json({ error: `Produit inconnu: ${it.productId}` }, { status: 400 });
      }
      const qty = Number(it.quantity);
      if (!Number.isFinite(qty) || qty <= 0) {
        return NextResponse.json({ error: "Quantité invalide" }, { status: 400 });
      }
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: { name: p.name },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: qty,
      });
    }

    const origin = req.headers.get("origin") || req.headers.get("x-forwarded-host") || "";
    // Fallback to absolute URLs if origin is missing (e.g., during some SSR calls)
    const baseUrl = origin && !origin.startsWith("http") ? `https://${origin}` : origin || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/cart?redirect_status=succeeded&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart?redirect_status=canceled`,
      // Optionally add metadata or customer_email here
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("/api/checkout", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
