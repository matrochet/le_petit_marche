"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "promo-banner-dismissed-v1";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-emerald-50 border-b border-emerald-200 text-emerald-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 relative text-sm">
        <div className="flex items-center gap-2 justify-center text-center">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[11px]">%</span>
          <span>
            <strong>Offre du week-end:</strong> Livraison offerte + -10% avec le code <strong>MARCHE</strong>
          </span>
        </div>
        <button
          onClick={dismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded hover:bg-emerald-100"
          aria-label="Fermer la bannière"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
