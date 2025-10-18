"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Compute derived values directly (simple arrays, inexpensive)
  const count = useMemo(() => items.reduce((acc, it) => acc + it.quantity, 0), [items]);
  const grandTotal = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity * it.price, 0),
    [items]
  );

  // Handle Stripe redirect params (?redirect_status=succeeded|canceled)
  useEffect(() => {
    const status = searchParams.get("redirect_status");
    if (!status) return;
    if (status === "succeeded") {
      // Clear cart once and strip params from URL
      clear();
      setSuccessMsg("Paiement réussi. Merci pour votre commande !");
      // Remove query params to avoid re-trigger on refresh
      router.replace("/cart");
    } else if (status === "canceled") {
      setInfoMsg("Paiement annulé. Vous pouvez réessayer.");
      router.replace("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Plus de redirection Checkout Sessions: on conserve uniquement le flux Elements

  if (!items.length) {
    return (
      <div className="min-h-screen mx-auto max-w-4xl flex flex-col items-start gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Panier</h1>
        <p className="text-black/70 dark:text-white/70">Votre panier est vide.</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
        >
          Continuer les achats
        </Link>
      </div>
    );
  }

  return (
  <div className="min-h-screen mx-auto max-w-5xl flex flex-col gap-8">
      {successMsg && (
        <div className="rounded-md border border-green-300 bg-green-50 text-green-800 px-4 py-3">
          {successMsg}
        </div>
      )}
      {infoMsg && (
        <div className="rounded-md border border-amber-300 bg-amber-50 text-amber-800 px-4 py-3">
          {infoMsg}
        </div>
      )}
      {/* Plus d'erreur liée à la redirection Stripe Checkout */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold">Panier ({count})</h1>
        <button
          onClick={() => clear()}
          className="text-sm text-red-600 hover:underline"
        >
          Vider le panier
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row gap-4 border-b border-emerald-100 pb-6 last:border-b-0"
          >
            <Link href={`/product/${item.productId}`} className="shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={160}
                height={120}
                className="w-40 h-28 object-cover rounded-md border border-emerald-100"
                unoptimized
              />
            </Link>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/product/${item.productId}`}
                  className="font-semibold text-lg hover:underline"
                >
                  {item.name}
                </Link>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Retirer
                </button>
              </div>
              <div className="text-sm text-black/60 dark:text-white/60">
                Prix unitaire: {formatPrice(item.price)}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <label className="text-xs uppercase tracking-wide text-black/60 dark:text-white/60">
                  Quantité
                </label>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Diminuer"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded border hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!Number.isNaN(v)) updateQuantity(item.productId, v);
                    }}
                    className="w-16 rounded border px-2 py-1 text-center text-sm bg-transparent"
                  />
                  <button
                    aria-label="Augmenter"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded border hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-2 font-medium">
                Sous-total: {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-4 pt-4 border-t">
        <div className="text-xl font-semibold">
          Total: {formatPrice(grandTotal)}
        </div>
        <Link
          href="/checkout"
          className="inline-flex items-center rounded-md bg-emerald-600 text-white px-6 py-3 text-sm font-medium shadow hover:bg-emerald-700"
        >
          Paiement
        </Link>
      </div>
    </div>
  );
}
