import Link from "next/link";

export const metadata = {
  title: "Se connecter | Le Petit Marché",
  description: "Connexion au compte",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-sm w-full rounded-lg border p-6 bg-white">
        <h1 className="text-xl font-bold">Se connecter</h1>
        <p className="text-sm text-black/60 mt-1">Choisissez une méthode de connexion.</p>

        <div className="mt-6 space-y-3">
          <Link
            href="/api/auth/signin/github?callbackUrl=/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-black/90"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.38.81 1.12.81 2.26v3.34c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/></svg>
            Se connecter avec GitHub
          </Link>
          <Link
            href="/api/auth/signin/google?callbackUrl=/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white border px-4 py-2 text-black hover:bg-black/5"
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" className="h-5 w-5"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.444 16.15 18.87 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.176 0 9.893-1.977 13.461-5.197l-6.207-5.255C29.273 35.517 26.787 36.5 24 36.5c-5.202 0-9.613-3.322-11.27-7.969l-6.51 5.017C9.522 39.605 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.794 2.239-2.22 4.159-4.09 5.531l6.207 5.255C39.262 36.61 44 30.982 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Se connecter avec Google
          </Link>
        </div>
        <div className="mt-6 flex justify-between text-sm">
          <Link className="text-emerald-700 hover:underline" href="/">Retour</Link>
          <Link className="text-emerald-700 hover:underline" href="/api/auth/signin">UI par défaut</Link>
        </div>
      </div>
    </div>
  );
}
