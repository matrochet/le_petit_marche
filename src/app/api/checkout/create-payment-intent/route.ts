import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

type Item = {
  productId: string;
  quantity: number;
};

export async function POST(req: Request) {
  try {
    // Basic origin check (helps CSRF mitigation in addition to same-site cookies)
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    if (origin && !origin.startsWith(baseUrl)) {
      return NextResponse.json({ error: "Origine non autorisée" }, { status: 403 });
    }

    // Simple in-memory rate limiter (per-process). In production, use Redis or similar.
    // Keyed by IP
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
    const now = Date.now();
    // Attach a simple rate limiter store to globalThis (process-local)
    type RateStore = Map<string, number[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = globalThis as any;
    if (!g.__rate) {
      g.__rate = new Map<string, number[]>();
    }
    const store: RateStore = g.__rate as RateStore;
    const windowMs = 60_000; // 1 minute
    const limit = 20;
    const arr = store.get(ip) || [];
    const recent = arr.filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
    }
    recent.push(now);
    store.set(ip, recent);

    const body = (await req.json()) as { items: Item[] };
    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Fetch products from DB to compute trusted total
    const ids = [...new Set(body.items.map((i) => i.productId))];
    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true, price: true, name: true },
    });
    const priceMap = new Map(products.map((p) => [p.id, p.price]));

    let amountCents = 0;
    for (const it of body.items) {
      const price = priceMap.get(it.productId);
      if (!price) {
        return NextResponse.json({ error: `Produit inconnu: ${it.productId}` }, { status: 400 });
      }
      if (typeof it.quantity !== "number" || it.quantity <= 0) {
        return NextResponse.json({ error: "Quantité invalide" }, { status: 400 });
      }
      amountCents += Math.round(price * 100) * it.quantity;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: { cart_items_count: String(body.items.length) },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("/api/checkout/create-payment-intent", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
