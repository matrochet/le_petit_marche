import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import LegalLinks from "@/components/legal-links";

export const metadata: Metadata = {
	title: "Politique de Cookies",
	description: "Politique d’utilisation des cookies et traceurs sur Le Petit Marché.",
};

export default function Page() {
	const sections = [
		{
			id: "definition",
			title: "Qu’est-ce qu’un cookie ?",
			content: (
				<p>
					Un cookie est un petit fichier texte déposé sur votre appareil lors de la consultation d’un site web. Il permet de mémoriser des informations utiles à votre navigation (ex. préférences, session).
				</p>
			),
		},
		{
			id: "types-cookies",
			title: "Types de cookies utilisés",
			content: (
				<div>
					<ul className="list-disc list-inside">
						<li>
							<strong>Cookies nécessaires</strong> : essentiels au bon fonctionnement du site (ex. conservation du panier avec stockage local, gestion de session, sécurité). Sans eux, certaines fonctionnalités ne peuvent pas fonctionner.
						</li>
						<li>
							<strong>Cookies de mesure d’audience</strong> : permettent d’analyser la fréquentation et d’améliorer le site (statistiques agrégées).
						</li>
						<li>
							<strong>Cookies de personnalisation</strong> : mémorisent vos préférences d’affichage et d’expérience utilisateur.
						</li>
						<li>
							<strong>Cookies liés au paiement et à la sécurité</strong> : utilisés par nos prestataires (ex. Stripe) pour sécuriser les transactions et détecter la fraude.
						</li>
					</ul>
				</div>
			),
		},
		{
			id: "consequences-refus",
			title: "Conséquences d’un refus de cookies",
			content: (
				<div>
					<p>
						Vous pouvez refuser les cookies non essentiels. Néanmoins, ce choix peut dégrader l’expérience d’utilisation du site. Par exemple :
					</p>
					<ul className="list-disc list-inside">
						<li>Le panier peut ne pas être conservé entre les pages ou les visites.</li>
						<li>Certains moyens de paiement (Stripe) peuvent dysfonctionner ou être indisponibles.</li>
						<li>La personnalisation et certaines préférences d’affichage ne seront pas mémorisées.</li>
						<li>Les mesures d’audience seront limitées, impactant l’amélioration du site.</li>
					</ul>
				</div>
			),
		},
		{
			id: "gestion-consentement",
			title: "Gestion du consentement",
			content: (
				<div>
					<p>
						Vous pouvez accepter ou refuser les cookies non essentiels à tout moment via le bandeau d’acceptation affiché à la première visite, ou en ajustant les paramètres de votre navigateur.
					</p>
					<p>
						Si vous avez déjà choisi, supprimez les cookies du navigateur pour faire réapparaître le bandeau. Les cookies nécessaires au fonctionnement ne sont pas soumis au consentement.
					</p>
				</div>
			),
		},
		{
			id: "duree-vie",
			title: "Durée de vie des cookies",
			content: (
				<ul className="list-disc list-inside">
					<li>Cookies de session : supprimés à la fermeture du navigateur.</li>
					<li>Cookies persistants : durées proportionnées à leur finalité, dans les limites recommandées par la CNIL.</li>
					<li>Cookies tiers (Stripe, mesure d’audience) : selon la politique du prestataire.</li>
				</ul>
			),
		},
		{
			id: "contact",
			title: "Contact",
			content: (
				<p>
					Pour toute question relative aux cookies, contactez notre support via la page Contact. Vous pouvez également consulter la Politique de confidentialité pour en savoir plus sur le traitement de vos données.
				</p>
			),
		},
	];

	return <LegalPage title="Politique de Cookies" updatedAt={new Date()} sections={sections} extraBelowToc={<LegalLinks />} />;
}

