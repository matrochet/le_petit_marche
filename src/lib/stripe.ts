import Stripe from "stripe";

// Lazily create a singleton Stripe client at runtime to avoid build-time env requirements
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      // Throw only when actually used (e.g., in an API route), not at import time
      throw new Error("Missing STRIPE_SECRET_KEY in environment");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2025-08-27.basil",
    });
  }
  return stripeClient;
}

export type { Stripe };
