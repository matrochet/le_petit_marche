"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CookiePreferences from "@/components/CookiePreferences";

const CONSENT_KEY = "cookie_consent_v2";

type ConsentCategory = "necessary" | "analytics" | "marketing";
type ConsentMap = Record<ConsentCategory, boolean>;

const defaultConsent: ConsentMap = {
  necessary: true, // toujours actif, non configurable
  analytics: false,
  marketing: false,
};

function readConsent(): ConsentMap | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentMap;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

function writeConsent(val: ConsentMap) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(val));
    // aussi poser un cookie lisible côté serveur pendant 12 mois
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 12);
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
      JSON.stringify(val)
    )}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  } catch {}
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [consent, setConsent] = useState<ConsentMap>(defaultConsent);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
      setConsent(defaultConsent);
    } else {
      setConsent(existing);
    }
  }, []);


  const acceptAll = () => {
    const val: ConsentMap = { necessary: true, analytics: true, marketing: true };
    writeConsent(val);
    setConsent(val);
    setOpen(false);
  };

  const savePreferences = () => {
    writeConsent(consent);
    setOpen(false);
  };

  const rejectAll = () => {
    const val: ConsentMap = { necessary: true, analytics: false, marketing: false };
    writeConsent(val);
    setConsent(val);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-xl border border-emerald-300 bg-white shadow-2xl ring-1 ring-emerald-200">
          <div className="p-4 sm:p-5">
          {!showPrefs ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-black/90">
                <p className="mb-1">
                  Nous utilisons des cookies nécessaires au fonctionnement du site, ainsi que des cookies d’analyse et de marketing (optionnels)
                  pour améliorer votre expérience et mesurer l’audience.
                </p>
                <p className="text-black/75">
                  Vous pouvez consentir à tout moment ou personnaliser vos choix. En savoir plus dans notre {" "}
                  <Link href="/legal/politique-de-cookies" className="underline">Politique de cookies</Link> et notre {" "}
                  <Link href="/legal/politique-de-confidentialite" className="underline">Politique de confidentialité</Link>.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPrefs(true)}
                  className="px-3 py-2 text-sm rounded-md border border-emerald-400 hover:bg-emerald-50"
                >
                  Personnaliser
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 shadow"
                >
                  Accepter
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <CookiePreferences
                  value={consent}
                  onChange={setConsent}
                  onSave={savePreferences}
                  onCancel={() => setShowPrefs(false)}
                />
              </div>
              <div className="flex flex-wrap items-end justify-end gap-2">
                <button
                  onClick={() => setShowPrefs(false)}
                  className="px-3 py-2 text-sm rounded-md border border-emerald-300 hover:bg-emerald-50"
                >
                  Retour
                </button>
                <button
                  onClick={savePreferences}
                  className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Enregistrer
                </button>
                <button
                  onClick={rejectAll}
                  className="px-3 py-2 text-sm rounded-md border border-red-300 text-red-700 hover:bg-red-50"
                >
                  Refuser tout
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-2 text-sm rounded-md bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
