"use client";
import React, { useEffect, useState } from "react";

export type LegalSection = {
	id: string;
	title: string;
	content: React.ReactNode;
};

export default function LegalPage({
	title,
	updatedAt,
	sections,
	extraBelowToc,
}: {
	title: string;
	updatedAt: string | Date;
	sections: LegalSection[];
	extraBelowToc?: React.ReactNode;
}) {
	// Compute localized date on client after mount to avoid SSR/client locale mismatch during hydration
	const [formatted, setFormatted] = useState("");
	useEffect(() => {
		try {
			const d = new Date(updatedAt);
			const str = d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
			setFormatted(str);
		} catch {
			// Fallback to ISO date if something goes wrong
			setFormatted(new Date(updatedAt).toISOString().slice(0, 10));
		}
	}, [updatedAt]);

	return (
		<div className="mx-auto max-w-3xl">
			<header className="mb-8">
						<h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
						<p className="text-black/60 dark:text-white/60">
							Dernière mise à jour{'\u00A0'}: <span suppressHydrationWarning>{formatted}</span>
						</p>
			</header>

			{sections.length > 0 && (
				<nav aria-label="Sommaire" className="mb-8">
						<div className="rounded-lg border border-emerald-100 bg-white p-4">
						<div className="font-semibold mb-2">Sommaire</div>
							<ul className="space-y-1 list-disc list-inside text-slate-900">
							{sections.map((s) => (
								<li key={s.id}>
									<a className="hover:underline" href={`#${s.id}`}>
										{s.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</nav>
			)}

			{extraBelowToc && (
				<div className="mb-8">{extraBelowToc}</div>
			)}

				<article className="prose prose-emerald max-w-none text-slate-900">
				{sections.map((s) => (
					<section key={s.id} id={s.id} className="scroll-mt-24">
						<h2 className="text-xl font-semibold mt-8 mb-3">{s.title}</h2>
								<div className="leading-relaxed">{s.content}</div>
					</section>
				))}
			</article>
		</div>
	);
}

