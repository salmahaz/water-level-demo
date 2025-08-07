import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  offeredPrice?: number;
  name: string;
  value: string;
  imageUrl?: string;
  isAvailable?: boolean;
}

export interface CartState {
  cart: Record<string, CartItem>;
  total: number;
  updateCart: (newItem: Record<string, CartItem>) => void;
  clearCart: () => void;
  removeItem: (itemId: string) => void;
  setTotal: () => void;
}

export const useStore = create<CartState>()(
  persist(
    (set) => ({
      cart: {},
      total: 0,
      updateCart: (newItem) =>
        set((state) => ({ cart: { ...state.cart, ...newItem } })),
      clearCart: () => set(() => ({ cart: {}, total: 0 })),
      removeItem: (itemId) =>
        set((state) => ({
          cart: Object.fromEntries(
            Object.entries(state.cart).filter(([key]) => key !== itemId),
          ),
        })),

      setTotal: () =>
        set((state) => ({
          total: Object.values(state.cart).reduce(
            (sum, item) => sum + item.quantity * item.price,
            0,
          ),
        })),
    }),
    {
      name: "cart-storage", // Key for localStorage
      partialize: (state) => ({
        cart: state.cart || {},
        total: state.total || 0,
      }),
      onRehydrateStorage: (state) => {
        try {
          const data = localStorage.getItem("cart-storage");
          if (!data) return;
          const parsed = JSON.parse(data);
          return { ...state, ...parsed };
        } catch {
          return { cart: {}, total: 0 };
        }
      },
    } as PersistOptions<CartState>, // Explicit cast to resolve type issues
  ),
);
