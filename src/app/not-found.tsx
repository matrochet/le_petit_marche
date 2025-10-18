import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="text-7xl font-bold text-emerald-600">404</div>
      <h1 className="text-2xl font-semibold mt-2">Page introuvable</h1>
      <p className="text-black/60 dark:text-white/60 mt-2 max-w-xl">
        Désolé, la page que vous recherchez n’existe pas ou a été déplacée.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Accueil</Link>
        <Link href="/produits" className="px-4 py-2 rounded-md border border-emerald-300 hover:bg-emerald-50">Nos produits</Link>
      </div>
    </div>
  );
}
