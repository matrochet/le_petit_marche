"use client";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <div className="text-7xl font-bold text-emerald-600">500</div>
          <h1 className="text-2xl font-semibold mt-2">Une erreur est survenue</h1>
          <p className="text-black/60 dark:text-white/60 mt-2 max-w-xl">
            Nous avons rencontré un problème inattendu. Vous pouvez réessayer ou revenir à l’accueil.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={reset} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Réessayer</button>
            <Link href="/" className="px-4 py-2 rounded-md border border-emerald-300 hover:bg-emerald-50">Accueil</Link>
          </div>
          {process.env.NODE_ENV !== "production" && (
            <pre className="mt-6 max-w-2xl overflow-auto text-left text-xs bg-black/5 p-3 rounded">{error.message}</pre>
          )}
        </div>
      </body>
    </html>
  );
}
