# Le Petit Marché — Next.js + Prisma + Stripe

Une épicerie en ligne minimaliste mais complète: catalogue, panier avec Zustand, paiement Stripe (Elements), base SQLite via Prisma, et images locales servies depuis `public/`.

## Démarrage rapide

1. Installer les dépendances et configurer Prisma

```bash
npm install
npm run db:push   # synchronise le schéma Prisma (SQLite)
npm run seed      # insère les produits de démonstration
```

2. Variables d’environnement (Stripe)

Créer `.env` à la racine et renseigner:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. Lancer en développement

```bash
npm run dev
```

Ce script copie d’abord les images depuis `src/app/images_le_petit_marché` vers `public/images_le_petit_marché` via `scripts/copy-images.mjs`, puis démarre Next.js.

Ouvrez http://localhost:3000.

## Scripts utiles

- `npm run dev` — copie des images puis serveur Next.js (Turbopack)
- `npm run build` — copie des images puis build de production
- `npm run start` — démarre le serveur en mode production (après build)
- `npm run seed` — seed Prisma TypeScript (via tsx)
- `npm run db:push` — applique le schéma Prisma à la base SQLite
- `npm run db:studio` — ouvre Prisma Studio pour consulter/modifier la DB
- `npm run assets:copy` — copie manuelle des images vers `public/`

## Architecture

- App Router Next.js (React 19, TypeScript)
- Prisma (SQLite). Client généré vers `src/generated/prisma`
- Zustand pour le panier (persist)
- Stripe Elements (route `/api/checkout/create-payment-intent`)
- Images locales en `public/images_le_petit_marché` (chemins enregistrés en base dans `imageUrl`)

Routes principales:

- `/` — Landing (héros, avantages, vedettes, catégories)
- `/produits` — Catalogue + filtre par `?category=`
- `/product/[id]` — Détail produit
- `/cart` — Panier
- `/checkout` — Paiement (Elements)

## Personnalisation favicon/titres

- Icône par défaut: `src/app/icon.svg`
- Icônes spécifiques: `src/app/produits/icon.svg`, `src/app/cart/icon.svg`, `src/app/checkout/icon.svg`, `src/app/product/[id]/icon.svg`
- Titre global: défini dans `src/app/layout.tsx` (template “%s | Le Petit Marché”). Les pages/export `metadata`/`generateMetadata` ajustent le titre.

## Authentification (NextAuth)

Le projet utilise NextAuth v4 avec l'adaptateur Prisma (JWT). Providers actifs : GitHub et Google.

Variables d’environnement requises :

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=une_chaine_aleatoire_longue

# GitHub OAuth
GITHUB_ID=...
GITHUB_SECRET=...

# Google OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Callbacks de redirection à configurer sur les consoles OAuth :
- GitHub: http://localhost:3000/api/auth/callback/github
- Google: http://localhost:3000/api/auth/callback/google

UI :
- Page dédiée : `/signin` avec boutons GitHub et Google
- Header : bouton « Se connecter » (ou état connecté + « Se déconnecter »)

## Déploiement

Build de prod puis start:

```bash
npm run build
npm run start
```

Pensez à configurer les variables d’environnement Stripe en prod.

## Ouvrir la base de données (SQLite)

La base locale est SQLite: `prisma/dev.db` (cf. `prisma/schema.prisma`).

- Méthode recommandée: Prisma Studio

```bash
npm run db:studio
```

Le studio s’ouvre (http://localhost:5555 par défaut) et permet d’inspecter/éditer les enregistrements.

- Alternatives:
  - Extension VS Code “SQLite Viewer/Explorer”: ouvrez `prisma/dev.db` et explorez les tables
  - DB Browser for SQLite (application desktop): Fichier → Ouvrir → `prisma/dev.db`
