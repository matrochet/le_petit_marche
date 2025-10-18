import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Contactez Le Petit Marché: formulaire de contact, coordonnées, et plan d’accès.",
};

// Carte Google Maps intégrée (optionnelle)
function MapEmbed() {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border">
      <iframe
        title="Plan d’accès"
        className="h-64 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={"https://www.google.com/maps?q=La%20D%C3%A9fense%2C%2092800%20Puteaux%2C%20France&output=embed"}
        allowFullScreen
      />
    </div>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Nous contacter</h1>
      <p className="mt-2 text-gray-600">Une question sur un produit ou une commande{String.fromCharCode(160)}? Écrivez‑nous via le formulaire ou utilisez nos coordonnées.</p>
      <p className="mt-1 text-gray-600">Le Petit Marché, c’est une petite équipe locale. Nous répondons généralement sous 24‑48h ouvrées.</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Formulaire de contact</h2>
            <p className="mt-1 text-sm text-gray-500">Tous les champs sont requis.</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Coordonnées</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-medium">Adresse{String.fromCharCode(160)}:</span> La Défense, 92800 Puteaux, France
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=La%20D%C3%A9fense%2C%2092800%20Puteaux%2C%20France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Voir sur Google Maps
                </a>
              </li>
              <li>
                <span className="font-medium">Téléphone{String.fromCharCode(160)}:</span> 01 23 45 67 89
              </li>
              <li>
                <span className="font-medium">E‑mail{String.fromCharCode(160)}:</span> contact@lepetitmarche.fr
              </li>
              <li className="text-gray-500">
                Du lundi au vendredi, 9h‑18h (hors jours fériés)
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Plan d’accès (optionnel)</h2>
            <p className="mt-1 text-sm text-gray-500">Retrouvez‑nous facilement grâce à la carte ci‑dessous.</p>
            <div className="mt-3">
              <MapEmbed />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
