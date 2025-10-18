"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";

type ConsentValue = "accepted" | "rejected";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(CONSENT_KEY);
      if (!existing) setVisible(true);
    } catch {
      // ignore SSR/localStorage errors
    }
  }, []);

  const setConsent = (val: ConsentValue) => {
    try {
      localStorage.setItem(CONSENT_KEY, val);
      // simple cookie for server visibility (1 year)
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `${CONSENT_KEY}=${val}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="rounded-lg border border-emerald-200 bg-white/95 backdrop-blur p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-black/80">
              Nous utilisons des cookies pour améliorer votre expérience et mesurer l’audience. Consultez notre {" "}
              <Link href="/legal/politique-de-cookies" className="underline">Politique de cookies</Link>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConsent("rejected")}
                className="px-3 py-2 text-sm rounded-md border border-emerald-300 hover:bg-emerald-50"
              >
                Refuser
              </button>
              <button
                onClick={() => setConsent("accepted")}
                className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
