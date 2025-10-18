"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function CartLink() {
  const total = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full h-10 w-10 hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Aller au panier"
    >
      {/* Cart icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {/* Badge */}
      <span className="absolute -top-1 -right-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] px-1">
        {total}
      </span>
    </Link>
  );
}
