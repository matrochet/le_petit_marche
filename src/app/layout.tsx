import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/site-header";
import { Providers } from "@/components/providers";
import PromoBanner from "@/components/promo-banner";
import { SEO, jsonLdScript, websiteJsonLd, organizationJsonLd } from "@/components/SEO";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";
import ClientYear from "@/components/client-year";
import TestModeBadge from "@/components/test-mode-badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Le Petit Marché",
    template: "%s | Le Petit Marché",
  },
  description: "Épicerie de quartier en ligne\u00A0: pains croustillants, fruits & légumes de saison, fromages et douceurs artisanales.",
  applicationName: "Le Petit Marché",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Le Petit Marché",
    description:
      "Épicerie de quartier en ligne\u00A0: pains croustillants, fruits & légumes de saison, fromages et douceurs artisanales.",
    url: siteUrl,
    siteName: "Le Petit Marché",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Le Petit Marché",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Petit Marché",
    description:
      "Épicerie de quartier en ligne\u00A0: pains croustillants, fruits & légumes de saison, fromages et douceurs artisanales.",
    images: ["/icon.svg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SEO>
          {jsonLdScript(
            websiteJsonLd({
              name: "Le Petit Marché",
              url: siteUrl,
            })
          )}
          {jsonLdScript(
            organizationJsonLd({
              name: "Le Petit Marché",
              url: siteUrl,
              logo: `${siteUrl}/icon.svg`,
            })
          )}
        </SEO>
  <PromoBanner />
  <TestModeBadge />
        <Providers>
          <SiteHeader />
        </Providers>

        {/* Main content container */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Providers>{children}</Providers>
        </main>

  <CookieBanner />

        {/* Footer */}
        <footer className="border-t mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div>
              <div className="font-semibold mb-2">Le Petit Marché</div>
              <p className="text-black/60 dark:text-white/60">Des produits frais et locaux, à portée de clic.</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Navigation</div>
              <ul className="space-y-1">
                <li><Link className="hover:underline" href="/">Accueil</Link></li>
                <li><Link className="hover:underline" href="/cart">Panier</Link></li>
                <li><Link className="hover:underline" href="/checkout">Paiement</Link></li>
                {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") && (
                  <li>
                    <Link className="hover:underline" href="/a-propos-du-mode-demo">
                      À propos du mode démo
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Légal</div>
              <ul className="space-y-1">
                <li><Link className="hover:underline" href="/legal/conditions-d-utilisation">Conditions d’utilisation</Link></li>
                <li><Link className="hover:underline" href="/legal/politique-de-confidentialite">Politique de confidentialité</Link></li>
                <li><Link className="hover:underline" href="/legal/cgv">Conditions Générales de Vente (CGV)</Link></li>
                <li><Link className="hover:underline" href="/legal/mentions-legales">Mentions légales</Link></li>
                <li><Link className="hover:underline" href="/legal/politique-de-cookies">Politique de cookies</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Contact</div>
              <ul className="space-y-1">
                <li><Link className="hover:underline" href="/contact">Nous contacter</Link></li>
                <li><Link className="hover:underline" href="/support">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-xs text-black/60 dark:text-white/60 border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <span>© <ClientYear /> Le Petit Marché</span>
              <span>Propulsé par Next.js</span>
            </div>
            {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 text-center">
                <span className="inline-block rounded bg-amber-50 border border-amber-200 text-amber-900 px-2 py-1">
                  Site de démonstration — paiements fictifs (mode test Stripe)
                </span>
                <span className="ml-2 text-amber-900/90">
                  <a className="underline" href="/a-propos-du-mode-demo">En savoir plus</a>
                </span>
              </div>
            )}
          </div>
        </footer>
      </body>
    </html>
  );
}

// ClientYear moved to a dedicated client component to keep this layout as a Server Component.
