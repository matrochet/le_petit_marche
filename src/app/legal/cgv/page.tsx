import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import LegalLinks from "@/components/legal-links";

export const metadata: Metadata = {
	title: "Conditions Générales de Vente (CGV)",
	description:
		"Conditions générales de vente de Le Petit Marché: objet, prix, commande, paiement, livraison, droit de rétractation, garanties, responsabilité, propriété intellectuelle, données personnelles, loi applicable.",
};

export default function Page() {
	const sections = [
		{
			id: "article-1-objet",
			title: "Article 1 — Objet et champ d’application",
			content: (
				<div>
					<p>
						Les présentes conditions générales de vente (ci-après « CGV ») régissent, sans restriction ni réserve, l’ensemble des ventes
						conclues entre la société Le Petit Marché (ci-après « le Vendeur ») et toute personne physique ou morale (ci-après « le Client »)
						souhaitant acheter des produits alimentaires et assimilés proposés sur le site.
					</p>
					<p>
						Toute commande implique l’acceptation pleine et entière des CGV par le Client. Le Vendeur se réserve le droit de les adapter
						ou de les modifier à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
					</p>
				</div>
			),
		},
		{
			id: "article-2-prix",
			title: "Article 2 — Prix et disponibilité",
			content: (
				<div>
					<p>
						Les prix sont exprimés en euros (€), toutes taxes comprises (TTC), sauf indication contraire. Ils peuvent être modifiés à tout
						moment. Les frais de livraison, d’emballage ou services additionnels éventuels sont indiqués avant la validation de la commande
						et facturés en supplément le cas échéant.
					</p>
					<p>
						Les offres de produits et prix sont valables tant qu’elles sont visibles sur le site, dans la limite des stocks disponibles. En cas
						d’indisponibilité après commande, le Client en sera informé dans les meilleurs délais et pourra obtenir le remboursement ou un
						produit équivalent.
					</p>
				</div>
			),
		},
		{
			id: "article-3-commande",
			title: "Article 3 — Commande et validation",
			content: (
				<div>
					<p>
						Le Client sélectionne les produits qu’il souhaite acheter et valide son panier après vérification. La commande n’est définitive
						qu’après confirmation par e-mail et encaissement effectif du paiement. Le Vendeur se réserve le droit de refuser toute commande
						anormale ou passée de mauvaise foi, ainsi que celles d’un Client avec lequel existerait un litige relatif au paiement d’une
						commande antérieure.
					</p>
					<p>
						Le Client est responsable de l’exactitude des informations communiquées (coordonnées, adresse, etc.). En cas d’erreur, les frais
						de réexpédition ou les conséquences en résultant sont à sa charge.
					</p>
				</div>
			),
		},
		{
			id: "article-4-paiement",
			title: "Article 4 — Paiement",
			content: (
				<div>
					<p>
						Le règlement s’effectue en ligne par carte bancaire via une plateforme de paiement sécurisée (Stripe). Le Vendeur n’a jamais
						connaissance des données bancaires du Client. La commande n’est considérée comme acceptée qu’après validation du paiement par
						l’établissement émetteur et confirmation du Vendeur.
					</p>
					<p>
						En cas de refus de paiement, d’anomalie ou de suspicion de fraude, la commande pourra être annulée. Les produits demeurent la
						propriété du Vendeur jusqu’au paiement complet du prix.
					</p>
				</div>
			),
		},
		{
			id: "article-5-livraison",
			title: "Article 5 — Livraison, retrait et transfert des risques",
			content: (
				<div>
					<p>
						Les modalités de livraison ou de retrait (zones desservies, délais indicatifs, créneaux, frais) sont précisées lors du passage de
						commande. Les délais ne sont fournis qu’à titre indicatif et peuvent varier en fonction de la disponibilité des produits,
						des conditions logistiques et du transporteur.
					</p>
					<p>
						Le Client s’engage à être présent au lieu et à l’heure convenus ou à mandater un tiers. En cas d’absence, une nouvelle
						livraison pourra être reprogrammée aux frais du Client. Le transfert des risques s’opère à la remise effective des produits au
						Client ou à tout tiers désigné par lui.
					</p>
				</div>
			),
		},
		{
			id: "article-6-retractation",
			title: "Article 6 — Droit de rétractation",
			content: (
				<div>
					<p>
						Conformément aux dispositions de l’article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé
						pour la fourniture de biens susceptibles de se détériorer ou de se périmer rapidement (produits alimentaires frais, etc.). Pour
						les autres produits non périssables, le Client dispose d’un délai de quatorze (14) jours à compter de la réception pour exercer
						son droit de rétractation, sans avoir à motiver sa décision ni supporter d’autres coûts que ceux prévus par la loi.
					</p>
					<p>
						En cas d’exercice du droit de rétractation, le produit doit être retourné dans son état d’origine et complet. Le remboursement
						intervient dans les quatorze (14) jours suivant la notification de la décision de rétractation ou la preuve d’expédition du
						retour, selon la première de ces dates, via le même moyen de paiement que celui utilisé par le Client.
					</p>
				</div>
			),
		},
		{
			id: "article-7-garanties",
			title: "Article 7 — Garanties légales et conformité",
			content: (
				<div>
					<p>
						Les produits bénéficient des garanties légales de conformité et des vices cachés dans les conditions prévues par la loi. En cas
						de produit non conforme ou défectueux, le Client doit en informer le Vendeur dans un délai raisonnable et fournir tout élément
						utile (photos, numéro de commande). Le Vendeur procédera, selon le cas, à un remplacement, une réparation ou un remboursement.
					</p>
				</div>
			),
		},
		{
			id: "article-8-responsabilite",
			title: "Article 8 — Responsabilité et force majeure",
			content: (
				<div>
					<p>
						Le Vendeur ne saurait être tenu responsable de l’inexécution ou de la mauvaise exécution du contrat due au fait du Client, au
						fait imprévisible et insurmontable d’un tiers, ou à un cas de force majeure au sens de la jurisprudence française.
					</p>
					<p>
						Les photographies et illustrations n’ont pas de valeur contractuelle. Les informations nutritionnelles et allergènes sont
						fournies à titre indicatif; le Client doit vérifier les étiquetages des produits lors de la réception.
					</p>
				</div>
			),
		},
		{
			id: "article-9-propriete-intellectuelle",
			title: "Article 9 — Propriété intellectuelle",
			content: (
				<div>
					<p>
						Tous les éléments du site (textes, visuels, logos, marques, bases de données, architecture) sont protégés par les lois en
						vigueur relatives à la propriété intellectuelle. Toute reproduction, représentation, adaptation ou exploitation, totale ou
						partielle, sans autorisation préalable est strictement interdite.
					</p>
				</div>
			),
		},
		{
			id: "article-10-donnees-personnelles",
			title: "Article 10 — Données personnelles et cookies",
			content: (
				<div>
					<p>
						Les données personnelles collectées sont traitées conformément à la Politique de confidentialité disponible sur le site. Le
						Client dispose de droits d’accès, de rectification, d’opposition, d’effacement, de limitation et de portabilité, qu’il peut
						exercer selon les modalités précisées dans ladite politique.
					</p>
					<p>
						Des cookies peuvent être déposés pour améliorer l’expérience utilisateur et mesurer l’audience. Le Client peut gérer ses
						préférences via le module de consentement présent sur le site.
					</p>
				</div>
			),
		},
		{
			id: "article-11-loi-applicable",
			title: "Article 11 — Loi applicable et litiges",
			content: (
				<div>
					<p>
						Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut,
						les tribunaux français territorialement compétents seront seuls compétents.
					</p>
					<p>
						Si l’une quelconque des clauses des présentes venait à être déclarée nulle ou inapplicable, les autres stipulations conserveront
						toute leur force et leur portée.
					</p>
				</div>
			),
		},
		{
			id: "article-12-contact",
			title: "Article 12 — Contact",
			content: (
				<div>
					<p>
						Pour toute question relative aux produits ou aux présentes CGV, le Client peut contacter le service client via la page « Nous
						contacter » du site ou par e-mail à l’adresse indiquée dans les mentions légales.
					</p>
				</div>
			),
		},
	];

	return <LegalPage title="Conditions Générales de Vente (CGV)" updatedAt={new Date()} sections={sections} extraBelowToc={<LegalLinks />} />;
}

