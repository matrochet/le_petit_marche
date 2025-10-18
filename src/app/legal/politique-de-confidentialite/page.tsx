import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import LegalLinks from "@/components/legal-links";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité conforme au RGPD: finalités, destinataires, durées, droits des utilisateurs, cookies et sécurité des données.",
};

export default function Page() {
  const sections = [
    {
      id: "article-1-objet",
      title: "Article 1 — Objet",
      content: (
        <p>
          La présente politique explique comment Le Petit Marché collecte, utilise, partage et protège vos données personnelles dans le cadre
          de la fourniture de ses services e-commerce, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi française applicable.
        </p>
      ),
    },
    {
      id: "article-2-donnees-collectees",
      title: "Article 2 — Données collectées",
      content: (
        <div>
          <p>
            Données d’identité et de contact (nom, prénom, e-mail, adresse, téléphone), informations de commande et de facturation, contenu
            du panier, préférences, cookies et données techniques (journal d’événements, identifiants de session). Les données de paiement sont
            traitées par notre prestataire (Stripe) et ne sont pas conservées par Le Petit Marché.
          </p>
        </div>
      ),
    },
    {
      id: "article-3-finalites-bases",
      title: "Article 3 — Finalités et bases légales",
      content: (
        <ul className="list-disc list-inside">
          <li>Exécution du contrat: gestion des commandes, paiements, livraison, service client.</li>
          <li>Intérêt légitime: amélioration du site, prévention de la fraude, statistiques agrégées.</li>
          <li>Consentement: communications marketing, cookies non essentiels.</li>
          <li>Obligations légales: comptabilité, facturation, obligations fiscales.</li>
        </ul>
      ),
    },
    {
      id: "article-4-destinataires",
      title: "Article 4 — Destinataires et transferts",
      content: (
        <div>
          <p>
            Destinataires: personnel habilité du Vendeur, prestataires techniques (hébergement, maintenance), prestataire de paiement (Stripe),
            transporteurs/livreurs, et le cas échéant autorités compétentes. Les transferts hors UE, lorsqu’ils existent, s’effectuent avec des
            garanties appropriées (clauses contractuelles types ou mécanismes reconnus par le RGPD).
          </p>
        </div>
      ),
    },
    {
      id: "article-5-durees",
      title: "Article 5 — Durées de conservation",
      content: (
        <div>
          <p>
            Les données sont conservées uniquement le temps nécessaire aux finalités poursuivies:
          </p>
          <ul className="list-disc list-inside">
            <li>Gestion de commande: pendant la relation contractuelle puis archivage légal (jusqu’à 10 ans pour pièces comptables).</li>
            <li>Prospection: jusqu’au retrait du consentement ou 3 ans après le dernier contact.</li>
            <li>Cookies: selon leur finalité (voir Politique de cookies) et les durées recommandées par la CNIL.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "article-6-droits",
      title: "Article 6 — Vos droits",
      content: (
        <div>
          <p>
            Vous disposez des droits d’accès, rectification, effacement, limitation, opposition, et portabilité. Vous pouvez aussi définir des
            directives post-mortem. Pour exercer vos droits, contactez-nous via la page « Nous contacter » ou l’adresse figurant dans les mentions
            légales. Une pièce d’identité peut être demandée en cas de doute raisonnable.
          </p>
          <p>
            Vous pouvez introduire une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.
          </p>
        </div>
      ),
    },
    {
      id: "article-7-cookies",
      title: "Article 7 — Cookies et traceurs",
      content: (
        <div>
          <p>
            Nous utilisons des cookies nécessaires au fonctionnement du site et, sous réserve de votre consentement, des cookies de
            mesure d’audience et de personnalisation. Vous pouvez gérer vos préférences via le bandeau de consentement et les paramètres de
            votre navigateur. Pour plus d’informations, consultez notre Politique de cookies.
          </p>
        </div>
      ),
    },
    {
      id: "article-8-securite",
      title: "Article 8 — Sécurité des données",
      content: (
        <div>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour garantir la confidentialité, l’intégrité et la
            disponibilité des données (chiffrement en transit, contrôle d’accès, journalisation). Les paiements sont traités par Stripe selon les
            standards de sécurité applicables.
          </p>
        </div>
      ),
    },
    {
      id: "article-9-mises-a-jour",
      title: "Article 9 — Modifications de la politique",
      content: (
        <p>
          Nous pouvons mettre à jour la présente politique pour refléter les évolutions légales ou opérationnelles. La version en vigueur est
          celle publiée sur le site à la date de consultation.
        </p>
      ),
    },
    {
      id: "article-10-contact",
      title: "Article 10 — Contact",
      content: (
        <p>
          Pour toute question relative à la protection des données, contactez notre support via la page « Nous contacter ». Les coordonnées
          du responsable du traitement figurent dans les mentions légales.
        </p>
      ),
    },
  ];

  return <LegalPage title="Politique de Confidentialité" updatedAt={new Date()} sections={sections} extraBelowToc={<LegalLinks />} />;
}
