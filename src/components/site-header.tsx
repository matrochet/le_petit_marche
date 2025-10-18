"use client";

import Link from "next/link";
import { useState } from "react";
import CartLink from "@/components/cart-link";
import { useSession, signOut } from "next-auth/react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 md:bg-white/80 md:backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold shadow">LM</span>
          <span className="font-semibold tracking-tight">Le Petit Marché</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-emerald-700">Accueil</Link>
          <Link href="/produits" className="hover:text-emerald-700">Produits</Link>
          <Link href="/checkout" className="hover:text-emerald-700">Paiement</Link>
          <Link href="/support" className="hover:text-emerald-700">Support</Link>
          <Link href="/contact" className="hover:text-emerald-700">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartLink />
          {/* Auth status (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            {status === "loading" ? (
              <span className="text-black/60">…</span>
            ) : session?.user ? (
              <>
                <span className="text-black/80 max-w-[12rem] truncate" title={session.user.email || session.user.name || "Compte"}>
                  {session.user.name || session.user.email || "Compte"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center rounded border border-emerald-200 px-3 py-1 hover:bg-emerald-50"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="inline-flex items-center rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
              >
                Se connecter
              </Link>
            )}
          </div>
          {/* Burger (mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer + overlay */}
      <div className={`md:hidden fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-xl border-l transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button className="h-9 w-9 inline-flex items-center justify-center rounded hover:bg-black/5" onClick={() => setOpen(false)} aria-label="Fermer le menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-1 text-sm">
            <Link href="/" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Accueil</Link>
            <Link href="/produits" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Produits</Link>
            <Link href="/checkout" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Paiement</Link>
            <Link href="/support" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Support</Link>
            <Link href="/contact" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/cart" className="py-2 px-2 rounded hover:bg-emerald-50" onClick={() => setOpen(false)}>Panier</Link>
            <div className="pt-2 border-t mt-2">
              {status === "loading" ? (
                <span className="block py-2 px-2 text-black/60">Chargement…</span>
              ) : session?.user ? (
                <button
                  className="w-full text-left py-2 px-2 rounded hover:bg-emerald-50"
                  onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                >
                  Se déconnecter
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="w-full block py-2 px-2 rounded hover:bg-emerald-50"
                  onClick={() => setOpen(false)}
                >
                  Se connecter
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
