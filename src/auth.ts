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

// Helpers to compute a stable base URL (no trailing slash) and optional forced redirect_uri
const rawBaseUrl =
  process.env.NEXTAUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const baseUrl = rawBaseUrl.replace(/\/+$/, ""); // trim trailing slashes just in case
const forceRedirectUri = process.env.FORCE_OAUTH_REDIRECT_URI === "true";

export const authOptions: NextAuthOptions = {
  // Use Prisma adapter only when an external DB is configured. On Vercel with SQLite, skip it to avoid runtime errors.
  ...(canUseAdapter ? { adapter: PrismaAdapter(prisma) } : {}),
  session: { strategy: "jwt" },
  // Enable debug logs when needed (prints to server logs)
  debug: process.env.NEXTAUTH_DEBUG === "true",
  // Use our custom sign-in page
  pages: { signIn: "/signin" },
  // Surface useful logs to the server console
  logger: {
    error: (code, ...message) => {
      console.error("[next-auth][error]", code, ...message);
    },
    warn: (code, ...message) => {
      console.warn("[next-auth][warn]", code, ...message);
    },
    debug: (code, ...message) => {
      // This fires only when NEXTAUTH_DEBUG=true
      console.log("[next-auth][debug]", code, ...message);
    },
  },
  events: {
    async signIn() {
      // Helpful breadcrumb to ensure base/redirect URIs look correct at runtime
      if (process.env.NEXTAUTH_DEBUG === "true") {
        console.log("[next-auth][events][signIn] baseUrl:", baseUrl);
        if (forceRedirectUri) {
          console.log("[next-auth][events][signIn] forced redirect URIs:", {
            github: `${baseUrl}/api/auth/callback/github`,
            google: `${baseUrl}/api/auth/callback/google`,
          });
        }
      }
    },
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      ...(forceRedirectUri
        ? { authorization: { params: { redirect_uri: `${baseUrl}/api/auth/callback/github` } } }
        : {}),
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET!,
      // You can adjust params like prompt/access_type; redirect_uri is optionally forced for strict matching
      authorization: {
        params: {
          prompt: "consent",
          ...(forceRedirectUri
            ? { redirect_uri: `${baseUrl}/api/auth/callback/google` }
            : {}),
        },
      },
    }),
  ],
};
