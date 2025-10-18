"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart-store";
import DemoNotice from "@/components/demo-notice";

// Create the Stripe promise only if a publishable key is present to avoid
// runtime errors like "Cannot read properties of undefined (reading 'match')".
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/cart",
      },
    });
    if (error) {
      // Optionally display error with UI state higher up
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <PaymentElement />
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
        disabled={!stripe}
      >
        Payer
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => items.reduce((a, i) => a + i.price * i.quantity, 0), [items]);
  const paymentsDisabled = !publishableKey;

  // Always call hooks; handle disabled state inside.
  useEffect(() => {
    if (paymentsDisabled) {
      setClientSecret(null);
      setError("Paiement désactivé: clé publique Stripe manquante.");
      setLoading(false);
      return;
    }
    async function createIntent() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/checkout/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur API");
        setClientSecret(data.clientSecret);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Erreur inconnue";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    if (items.length) createIntent();
    else {
      setClientSecret(null);
    }
  }, [items, paymentsDisabled]);

  useEffect(() => {
    async function createIntent() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/checkout/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur API");
        setClientSecret(data.clientSecret);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Erreur inconnue";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }
    if (items.length) createIntent();
    else {
      setClientSecret(null);
    }
  }, [items]);

  if (!items.length) {
    return <div className="p-6">Votre panier est vide.</div>;
  }

  if (loading || (!clientSecret && !paymentsDisabled)) {
    return <div className="p-6">Préparation du paiement…</div>;
  }

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-4">Paiement</h1>
      <DemoNotice className="mb-4" />
      <div className="text-lg font-medium mb-4">Total: {total.toFixed(2)} €</div>
      {error && (
        <div className="text-sm text-red-600 mb-4">
          {error.replace("d'environnement", "d&apos;environnement")}
        </div>
      )}
      {paymentsDisabled && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-md mb-4">
          Paiement désactivé: clé publique Stripe manquante. Ajoutez
          <span className="font-mono"> NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY </span>
          à vos variables d&apos;environnement.
        </div>
      )}
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          key={clientSecret}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
