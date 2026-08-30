import Stripe from "stripe";

const globalForStripe = globalThis as unknown as { stripe?: Stripe };

function createClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export const stripe = globalForStripe.stripe ?? createClient();

if (process.env.NODE_ENV !== "production" && stripe) {
  globalForStripe.stripe = stripe;
}
