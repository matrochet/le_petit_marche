import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support & FAQ",
  description: "Questions fréquentes: commandes, livraison, paiement, compte. Besoin d’aide? Contactez-nous.",
};

type QA = { q: string; a: React.ReactNode };

const sections: { id: string; title: string; items: QA[] }[] = [
  {
    id: "commandes",
    title: "Commandes",
    items: [
      {
        q: "Comment passer une commande?",
        a: (
          <p>
            Ajoutez vos produits au panier puis validez votre commande depuis la page « Paiement ». Un e‑mail de confirmation vous sera envoyé.
          </p>
        ),
      },
      {
        q: "Puis‑je modifier ou annuler ma commande?",
        a: (
          <p>
            Si votre commande n’est pas encore préparée, contactez‑nous rapidement via la <Link className="text-emerald-700 hover:underline" href="/contact">page de contact</Link>.
          </p>
        ),
      },
      {
        q: "Je n’ai pas reçu l’e‑mail de confirmation",
        a: (
          <p>
            Vérifiez votre dossier spam. Si besoin, contactez notre support avec votre nom et l’heure de commande.
          </p>
        ),
      },
    ],
  },
  {
    id: "livraison",
    title: "Livraison",
    items: [
      {
        q: "Quels sont les délais de livraison?",
        a: (
          <p>
            Nous livrons généralement en 24‑48h ouvrées. Les délais peuvent varier selon votre zone et les jours fériés.
          </p>
        ),
      },
      {
        q: "Délais moyens par zone pour des produits frais",
        a: (
          <ul className="list-disc list-inside text-gray-700">
            <li>Zone urbaine: le plus souvent sous 24h ouvrées.</li>
            <li>Zone périurbaine: 24‑48h ouvrées en moyenne.</li>
            <li>Zone rurale/éloignée: 48‑72h ouvrées selon la tournée.</li>
            <li>Produits de boulangerie: souvent le lendemain (J+1) selon l’heure de commande.</li>
            <li>Commande passée après l’heure limite (cut‑off): traitée le jour ouvré suivant.</li>
          </ul>
        ),
      },
      {
        q: "Quels sont les frais de livraison?",
        a: (
          <p>
            Les frais dépendent du poids et de la zone. Le montant exact s’affiche dans le panier avant paiement.
          </p>
        ),
      },
      {
        q: "Puis‑je suivre ma livraison?",
        a: (
          <p>
            Oui, un lien de suivi est fourni lorsque la commande est expédiée. En cas de souci, <Link className="text-emerald-700 hover:underline" href="/contact">contactez‑nous</Link>.
          </p>
        ),
      },
      {
        q: "Heures limites de préparation (cut‑off)",
        a: (
          <p>
            Les commandes validées avant l’heure limite sont généralement préparées le jour même. Celles passées après le cut‑off sont préparées le prochain jour ouvré. Les heures limites peuvent varier en période d’affluence (fêtes, promotions).
          </p>
        ),
      },
    ],
  },
  {
    id: "tarifs",
    title: "Tarifs & politique de frais",
    items: [
      {
        q: "Comment calculez‑vous les frais de livraison?",
        a: (
          <div>
            <p>Nous appliquons une tarification transparente visible avant paiement. Selon les périodes et zones, plusieurs politiques peuvent s’appliquer:</p>
            <ul className="mt-2 list-disc list-inside text-gray-700">
              <li>Forfait local: un prix fixe pour les livraisons de proximité.</li>
              <li>Par zone: un tarif qui varie selon votre adresse (urbaine/périurbaine/rurale).</li>
              <li>Par palier de panier: frais dégressifs lorsque le montant du panier augmente.</li>
              <li>Livraison offerte au‑delà d’un seuil: frais à 0€ si votre panier dépasse un certain montant (lorsque l’offre est active).</li>
              <li>Poids/volume: ajustement en fonction du poids ou du volume total (utile pour gros paniers).</li>
              <li>Chaîne du froid: un petit surcoût peut s’appliquer pour les produits réfrigérés, afin de garantir la qualité.</li>
              <li>Éco‑participation/consigne: éventuellement appliquée pour certains emballages réutilisables.</li>
            </ul>
            <p className="mt-2">Le meilleur tarif applicable est calculé automatiquement selon votre panier et votre adresse, et affiché avant validation.</p>
          </div>
        ),
      },
      {
        q: "Les tarifs évoluent‑ils?",
        a: (
          <p>
            Ils peuvent évoluer selon les coûts logistiques (carburant, emballages, saisonnalité) et les offres en cours. Toute modification est répercutée automatiquement et visible dans votre panier avant paiement.
          </p>
        ),
      },
      {
        q: "Des promotions ou codes de réduction sont‑ils proposés?",
        a: (
          <p>
            Oui, ponctuellement. Les remises et codes s’affichent lors des campagnes concernées. Si vous avez un code, saisissez‑le au moment du paiement.
          </p>
        ),
      },
    ],
  },
  {
    id: "paiement",
    title: "Paiement",
    items: [
      {
        q: "Quels moyens de paiement acceptez‑vous?",
        a: (
          <p>
            Nous acceptons les cartes bancaires via Stripe. Les paiements sont sécurisés et chiffrés.
          </p>
        ),
      },
      {
        q: "Mon paiement a échoué, que faire?",
        a: (
          <p>
            Vérifiez vos informations et le plafond de votre carte. Si le problème persiste, contactez notre équipe via la <Link className="text-emerald-700 hover:underline" href="/contact">page de contact</Link>.
          </p>
        ),
      },
      {
        q: "Quand suis‑je débité?",
        a: (
          <p>
            Le débit est effectué au moment de la validation du paiement.
          </p>
        ),
      },
    ],
  },
  {
    id: "produits-saisonnalite",
    title: "Produits & saisonnalité",
    items: [
      {
        q: "Pourquoi certains produits sont‑ils disponibles uniquement à certaines périodes?",
        a: (
          <p>
            Nous privilégions la proximité avec nos fournisseurs et la saisonnalité. Certains fruits, légumes ou spécialités artisanales ne sont disponibles qu’à des moments précis de l’année, pour garantir fraîcheur et qualité.
          </p>
        ),
      },
      {
        q: "Que se passe‑t‑il en cas d’indisponibilité de dernière minute?",
        a: (
          <p>
            Des aléas (météo, récoltes, ruptures chez le producteur) peuvent survenir. Nous vous prévenons au plus vite et proposons si possible une alternative équivalente ou le remboursement de l’article concerné.
          </p>
        ),
      },
      {
        q: "Proposez‑vous des alternatives ou précommandes?",
        a: (
          <p>
            Lorsque c’est pertinent, nous proposons des paniers de saison ou des précommandes. Pour un besoin spécifique, <Link className="text-emerald-700 hover:underline" href="/contact">contactez‑nous</Link>.
          </p>
        ),
      },
      {
        q: "La composition des paniers peut‑elle changer?",
        a: (
          <p>
            Oui, selon l’arrivage et les disponibilités locales. Nous mettons à jour la composition au plus proche de la réalité afin d’assurer une qualité constante.
          </p>
        ),
      },
    ],
  },
  {
    id: "compte",
    title: "Compte",
    items: [
      {
        q: "Dois‑je créer un compte pour commander?",
        a: (
          <p>
            Vous pouvez commander en tant qu’invité ou créer un compte pour suivre vos commandes et gagner du temps.
          </p>
        ),
      },
      {
        q: "Comment changer mon e‑mail ou mon mot de passe?",
        a: (
          <p>
            Accédez à votre espace compte (si disponible) ou <Link className="text-emerald-700 hover:underline" href="/contact">contactez le support</Link>.
          </p>
        ),
      },
      {
        q: "Comment supprimer mon compte?",
        a: (
          <p>
            Vous pouvez demander la suppression de votre compte à tout moment via la <Link className="text-emerald-700 hover:underline" href="/contact">page de contact</Link>.
          </p>
        ),
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Support & FAQ</h1>
      <p className="mt-2 text-gray-600">
        Retrouvez les réponses aux questions fréquentes. Pour une demande spécifique, utilisez notre <Link className="text-emerald-700 hover:underline" href="/contact">formulaire de contact</Link>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <aside className="order-2 lg:order-1 lg:col-span-1">
          <nav className="rounded-lg border p-4 text-sm">
            <div className="font-semibold mb-2">Catégories</div>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="hover:underline" href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 rounded-lg border p-4">
            <div className="font-semibold">Toujours besoin d’aide{String.fromCharCode(160)}?</div>
            <p className="text-sm text-gray-600">Notre équipe vous répond sous 24‑48h ouvrées.</p>
            <Link href="/contact" className="mt-3 inline-flex items-center rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Contacter le support</Link>
          </div>
        </aside>

        <div className="order-1 lg:order-2 lg:col-span-2 space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <div className="mt-4 divide-y">
                {s.items.map((item, idx) => (
                  <div key={idx} className="py-4">
                    <h3 className="font-medium">{item.q}</h3>
                    <div className="prose prose-sm mt-1 max-w-none text-gray-700">{item.a}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
