"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cart-store";

export interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  size?: "sm" | "md";
}

export const AddToCartButton = memo(function AddToCartButton({ product, size = "md" }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleClick = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAdded(false), 1200);
  }, [addItem, product.id, product.imageUrl, product.name, product.price]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60";
  const sizing =
    size === "sm"
      ? "text-xs px-2 py-1"
      : "text-sm px-4 py-2";
  const colors = added
    ? "bg-emerald-600 text-white"
    : "bg-emerald-600 hover:bg-emerald-700 text-white";

  return (
    <button onClick={handleClick} className={`${base} ${sizing} ${colors}`} aria-busy={added} disabled={added}> 
      {added ? "Ajouté !" : "Ajouter au panier"}
    </button>
  );
});

export default AddToCartButton;
