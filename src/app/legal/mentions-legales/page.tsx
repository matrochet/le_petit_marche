import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import LegalLinks from "@/components/legal-links";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales: éditeur Matthieu Rochet EI, hébergeur Vercel, directeur de publication Monsieur Rochet Matthieu, propriété intellectuelle, responsabilité et liens hypertextes.",
};

export default function Page() {
  const sections = [
    {
      id: "article-1-editeur",
      title: "Article 1 — Éditeur du site",
      content: (
        <div>
          <p>Éditeur : Matthieu Rochet</p>
        </div>
      ),
    },
    {
      id: "article-2-directeur",
      title: "Article 2 — Directeur de publication",
      content: <p>Directeur de publication : Monsieur Rochet Matthieu.</p>,
    },
    {
      id: "article-3-hebergeur",
      title: "Article 3 — Hébergeur",
      content: (
        <div>
          <p>Vercel Inc.</p>
          <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, United States</p>
          <p>Site : https://vercel.com</p>
        </div>
      ),
    },
    {
      id: "article-4-propriete-intellectuelle",
      title: "Article 4 — Propriété intellectuelle",
      content: (
        <div>
          <p>
            L’ensemble des éléments du site (textes, visuels, logo, structure, bases de données) sont protégés par les lois relatives à la
            propriété intellectuelle. Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation
            préalable est interdite.
          </p>
        </div>
      ),
    },
    {
      id: "article-5-responsabilites",
      title: "Article 5 — Limitations de responsabilité",
      content: (
        <div>
          <p>
            L’éditeur met tout en œuvre pour assurer l’exactitude et la mise à jour des informations publiées. Il ne saurait toutefois être tenu
            responsable des erreurs ou omissions, ni de l’indisponibilité du service. L’éditeur ne peut être tenu responsable d’un dommage
            direct ou indirect résultant de l’utilisation du site.
          </p>
        </div>
      ),
    },
    {
      id: "article-6-liens",
      title: "Article 6 — Liens hypertextes",
      content: (
        <div>
          <p>
            Le site peut contenir des liens vers d’autres sites. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute
            responsabilité quant aux informations qu’ils publient. La mise en place de liens vers le site est possible sous réserve de ne pas
            porter atteinte aux intérêts légitimes de l’éditeur et d’assurer une information préalable.
          </p>
        </div>
      ),
    },
  ];

  return <LegalPage title="Mentions Légales" updatedAt={new Date()} sections={sections} extraBelowToc={<LegalLinks />} />;
}
