"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number; // prix unitaire
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// Safe storage accessor to avoid SSR issues (window undefined)
const storageFactory = () => {
  if (typeof window === "undefined") {
    const memory: Record<string, string> = {};
    const memStorage: Storage = {
      getItem: (name: string) => (name in memory ? memory[name] : null),
      setItem: (name: string, value: string) => {
        memory[name] = value;
      },
      removeItem: (name: string) => {
        delete memory[name];
      },
      clear: () => {
        Object.keys(memory).forEach((k) => delete memory[k]);
      },
      key: (index: number) => Object.keys(memory)[index] ?? null,
      get length() {
        return Object.keys(memory).length;
      },
    };
    return memStorage;
  }
  return window.localStorage;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.productId === item.productId
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                ),
              };
            }
            return {
              items: [
                ...state.items,
                { ...item, quantity },
              ],
            };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, newQuantity) => {
        if (newQuantity <= 0) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQuantity } : i
          ),
        }));
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () => get().items.reduce((acc, i) => acc + i.quantity * i.price, 0),
    }),
    {
      name: "cart-store",
  storage: createJSONStorage(storageFactory),
      partialize: (state) => ({ items: state.items }),
      version: 1,
      migrate: (persisted) => persisted,
    }
  )
);

export type { CartState };
