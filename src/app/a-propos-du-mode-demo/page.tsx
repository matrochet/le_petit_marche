import Link from "next/link";

export const metadata = {
  title: "À propos du mode démo",
  description: "Informations sur le mode démonstration: paiements fictifs et données utilisées.",
};

export default function DemoAboutPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">À propos du mode démo</h1>
      <p className="text-black/80 dark:text-white/80 mb-3">
        Ce site est présenté en <strong>mode démonstration</strong>. Les paiements sont effectués avec des
        <strong> clés Stripe de test</strong> : <em>aucun débit réel n&apos;est effectué</em>.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Comment tester un paiement ?</h2>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-black/80 dark:text-white/80">
        <li>Utilisez une carte de test Stripe, par exemple <code>4242 4242 4242 4242</code> (date future, CVC aléatoire).</li>
  <li>Pour simuler une authentification 3‑D Secure, Stripe fournit d&apos;autres numéros dans sa <a className="text-emerald-700 hover:underline" href="https://docs.stripe.com/testing" target="_blank" rel="noreferrer">documentation</a>.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Données et confidentialité</h2>
      <p className="text-black/80 dark:text-white/80 mb-3">
        Ce projet pédagogique enregistre <em>des données minimales</em> pour illustrer le parcours d&apos;achat
        (panier, commandes fictives). Aucune donnée bancaire réelle n&apos;est collectée.
      </p>
      <p className="text-black/80 dark:text-white/80">
        Vous pouvez revenir au <Link className="text-emerald-700 hover:underline" href="/">catalogue</Link> ou accéder directement à la page
        <Link className="text-emerald-700 hover:underline ml-1" href="/checkout">Paiement</Link> pour tester le formulaire.
      </p>
    </div>
  );
}
