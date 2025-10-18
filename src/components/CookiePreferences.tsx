"use client";

import React from "react";
import type { ConsentMap } from "@/components/cookies/types";

type Props = {
  value: ConsentMap;
  onChange: (next: ConsentMap) => void;
  onSave: () => void;
  onCancel?: () => void;
};

export default function CookiePreferences({ value, onChange, onSave, onCancel }: Props) {
  return (
    <div>
      <div className="font-medium">Préférences cookies</div>
      <p className="text-sm text-black/70">
        Les cookies nécessaires sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Vous pouvez choisir d’activer ou non
        les catégories optionnelles ci‑dessous.
      </p>
      <ul className="mt-3 space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <input type="checkbox" checked disabled className="mt-1" aria-label="Cookies nécessaires" />
          <div>
            <div className="font-medium">Nécessaires</div>
            <p className="text-black/70">Essentiels pour la navigation, le panier, la sécurité et la stabilité du site.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <input
            id="pref-analytics"
            type="checkbox"
            className="mt-1"
            checked={value.analytics}
            onChange={(e) => onChange({ ...value, analytics: e.target.checked })}
          />
          <div>
            <label htmlFor="pref-analytics" className="font-medium cursor-pointer">Statistiques (Analytics)</label>
            <p className="text-black/70">Nous aident à comprendre l’utilisation du site pour l’améliorer (mesure d’audience agrégée).</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <input
            id="pref-marketing"
            type="checkbox"
            className="mt-1"
            checked={value.marketing}
            onChange={(e) => onChange({ ...value, marketing: e.target.checked })}
          />
          <div>
            <label htmlFor="pref-marketing" className="font-medium cursor-pointer">Marketing</label>
            <p className="text-black/70">Permettent d’afficher des contenus ou offres plus pertinents.</p>
          </div>
        </li>
      </ul>

      <div className="mt-4 flex gap-2">
        {onCancel && (
          <button onClick={onCancel} className="px-3 py-2 text-sm rounded-md border border-emerald-300 hover:bg-emerald-50">Annuler</button>
        )}
        <button onClick={onSave} className="px-3 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Sauvegarder</button>
      </div>
    </div>
  );
}
