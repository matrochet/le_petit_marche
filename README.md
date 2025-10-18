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

### Mode portfolio (clés Stripe de test en prod)

Ce projet peut être déployé en production avec des clés Stripe de test (pk_test_/sk_test_) afin de présenter le flux de paiement sans encaisser de vrais paiements. Implications :

- Les cartes réelles échouent; utilisez les cartes de test Stripe (ex : 4242 4242 4242 4242).
- Le tableau de bord Stripe doit être en « Test mode » pour voir les paiements.
- Un badge « Mode test Stripe » s’affiche dans l’interface pour plus de transparence.

Pour passer à de vrais paiements ultérieurement :

1. Remplacez `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` par une clé `pk_live_...` et `STRIPE_SECRET_KEY` par `sk_live_...`.
2. Re-déployez l’application.
3. (Si webhooks) Configurez l’endpoint webhook en « live » et mettez à jour `STRIPE_WEBHOOK_SECRET`.

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

## Base de données en production (Neon Postgres)

SQLite n’est pas adapté aux environnements serverless. Pour la production, migrez vers Postgres managé (ex.: Neon).

Étapes (résumé):

1. Créez un projet Neon (https://neon.tech). Récupérez l’URL de connexion (idéalement, la chaîne de connexion poolée) et définissez-la dans `DATABASE_URL`.
2. Mettez à jour `prisma/schema.prisma` pour utiliser `provider = "postgresql"` et `url = env("DATABASE_URL")` (déjà fait dans ce repo).
3. Exécutez les migrations en local ou en CI:

```bash
npm run db:migrate:dev    # crée une migration et l’applique en dev
# ou, en prod/CI:
npm run db:migrate:deploy  # applique les migrations existantes
```

4. Mettez la même `DATABASE_URL` dans Vercel (Project → Settings → Environment Variables) pour Preview/Production.

5. NextAuth: quand `DATABASE_URL` est présent, l’adaptateur Prisma est activé automatiquement et les comptes OAuth sont stockés en DB.

6. (Optionnel) Seed de données de démo: adaptez `prisma/seed.ts` pour Postgres si nécessaire, puis exécutez `npm run seed`.
