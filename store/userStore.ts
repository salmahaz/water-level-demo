import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  setUser: (user: User) => void; // Updates the user state
  clearUser: () => void; // Logs the user out
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: null,
      name: null,
      email: null,
      phoneNumber: null,
      setUser: (user) => set({ ...user }),
      clearUser: () => set({ id: null, name: null, email: null }),
    }),
    { name: "user-store" }
  )
);