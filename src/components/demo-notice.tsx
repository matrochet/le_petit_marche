"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function DemoNotice({ className = "" }: { className?: string }) {
  const isTest = useMemo(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
    return key.startsWith("pk_test_");
  }, []);

  if (!isTest) return null;

  return (
    <div className={`rounded-md border border-amber-200 bg-amber-50 text-amber-900 p-3 text-sm ${className}`}>
      <span>
        Site de démonstration : aucun paiement réel ne sera encaissé. Utilisez une carte de test Stripe (ex : 4242 4242 4242 4242).
      </span>
      <Link href="/a-propos-du-mode-demo" className="ml-2 underline text-amber-900/90 hover:text-amber-900">
        En savoir plus
      </Link>
    </div>
  );
}
