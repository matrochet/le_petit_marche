import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panier",
  description: "Gérez vos articles avant paiement.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
