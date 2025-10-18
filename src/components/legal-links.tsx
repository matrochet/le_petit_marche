import Link from "next/link";

export default function LegalLinks() {
  return (
    <div className="rounded-lg border border-emerald-100 bg-white p-4">
      <div className="font-semibold mb-2">Autres pages légales</div>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <Link className="hover:underline" href="/legal/mentions-legales">
            Mentions légales
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/legal/conditions-d-utilisation">
            Conditions d’utilisation
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/legal/cgv">
            Conditions Générales de Vente (CGV)
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/legal/politique-de-confidentialite">
            Politique de confidentialité
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/legal/politique-de-cookies">
            Politique de cookies
          </Link>
        </li>
      </ul>
    </div>
  );
}
