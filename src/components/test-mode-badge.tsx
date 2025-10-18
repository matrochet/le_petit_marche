"use client";

import { useMemo } from "react";

export default function TestModeBadge() {
  const isTest = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    return key.startsWith("pk_test_");
  }, []);

  if (!isTest) return null;

  return (
    <div
      className="fixed bottom-3 right-3 z-50 rounded-md bg-amber-600 text-white px-3 py-1 text-xs shadow-lg"
      title="Stripe est en mode test: aucun paiement réel ne sera encaissé"
    >
      Mode test Stripe
    </div>
  );
}
