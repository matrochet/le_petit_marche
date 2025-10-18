import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Add providers when ready (e.g., GitHub/Google/Email)
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Detect whether we can safely use the Prisma adapter (e.g., not on Vercel with local SQLite)
const onVercel = process.env.VERCEL === "1";
const hasExternalDb = !!process.env.DATABASE_URL; // if you migrate to Postgres/MySQL, set this
const forceAdapter = process.env.USE_PRISMA_ADAPTER === "true";
const disableAdapter = process.env.DISABLE_PRISMA_ADAPTER === "true";
const canUseAdapter = (hasExternalDb || !onVercel || forceAdapter) && !disableAdapter;

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter only when an external DB is configured. On Vercel with SQLite, skip it to avoid runtime errors.
  ...(canUseAdapter ? { adapter: PrismaAdapter(prisma) } : {}),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET!,
    }),
  ],
};
