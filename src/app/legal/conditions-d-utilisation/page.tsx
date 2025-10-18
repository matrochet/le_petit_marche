import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import LegalLinks from "@/components/legal-links";

export const metadata: Metadata = {
	title: "Conditions d’Utilisation",
	description: "Conditions d’utilisation du site Le Petit Marché: accès, compte, commandes, paiements et responsabilités.",
};

export default function Page() {
	const sections = [
		{
			id: "acceptation",
			title: "1. Acceptation des conditions",
			content: (
				<p>
					L’utilisation du site Le Petit Marché implique l’acceptation pleine et entière des présentes conditions d’utilisation.
				</p>
			),
		},
		{
			id: "compte",
			title: "2. Compte utilisateur",
			content: (
				<p>
					La création d’un compte peut être nécessaire pour certaines actions (ex. passage de commande). Vous êtes responsable de la confidentialité de vos identifiants et de l’exactitude des informations fournies. Toute activité réalisée avec vos identifiants vous est présumée imputable.
				</p>
			),
		},
		{
			id: "acces",
			title: "3. Accès au site",
			content: (
				<p>
					Le site est en principe accessible 24h/24 et 7j/7, sauf cas de force majeure, pannes ou opérations de maintenance. Nous nous réservons le droit de suspendre, interrompre ou limiter l’accès au site à tout moment.
				</p>
			),
		},
		{
			id: "contenu",
			title: "4. Contenu du site",
			content: (
				<p>
					Le contenu du site est fourni à titre informatif. Malgré nos soins, des erreurs peuvent subsister. Les photographies des produits ne sont pas contractuelles et certaines caractéristiques peuvent évoluer.
				</p>
			),
		},
		{
			id: "responsabilite",
			title: "5. Limitations de responsabilité",
			content: (
				<p>
					Le Petit Marché ne peut être tenu responsable des interruptions de service, dommages indirects, pertes de données, préjudices résultant de l’utilisation du site, ni des contenus externes accessibles via des liens hypertextes. La responsabilité ne saurait être engagée en cas de force majeure.
				</p>
			),
		},
		{
			id: "commande-paiement",
			title: "6. Commande et paiement",
			content: (
				<p>
					Toute commande implique l’acceptation des Conditions Générales de Vente (CGV). Les prix sont indiqués en euros, toutes taxes comprises; le paiement s’effectue via les moyens sécurisés proposés. Reportez-vous aux CGV pour le détail.
				</p>
			),
		},
		{
			id: "modification",
			title: "7. Modification des conditions",
			content: (
				<p>
					Nous nous réservons le droit de modifier les présentes conditions à tout moment. Les conditions applicables sont celles en vigueur à la date de votre visite.
				</p>
			),
		},
		{
			id: "droit-applicable",
			title: "8. Droit applicable",
			content: <p>Les présentes conditions sont régies par le droit français.</p>,
		},
	];

	return <LegalPage title="Conditions d’Utilisation" updatedAt={new Date()} sections={sections} extraBelowToc={<LegalLinks />} />;
}

