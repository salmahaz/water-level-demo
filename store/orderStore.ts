import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order } from "@/public/interfaces/orderInterfaces";

interface OrderStoreState {
  orderType: string | null;
  order: Partial<Order> & {
    addressId?: string;
    addressLabel?: string;
    addressInstructions?: string;
    voucherCode?: string | null;
  };
  setOrder: (order: Partial<Order>, orderType: string) => void;
  updateOrder: (updates: Partial<Order>) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStoreState>()(
  persist(
    (set, get) => ({
      orderType: null,
      order: {},
      setOrder: (order, orderType) => set({ order, orderType }),
      updateOrder: (updates) => set({ order: { ...get().order, ...updates } }),
      clearOrder: () => set({ order: {}, orderType: null }),
    }),
    { name: "order-store" }
  )
);
