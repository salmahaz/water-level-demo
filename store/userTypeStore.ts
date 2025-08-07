import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface UserTypeState {
  userType: "viewer" | "owner" | null;
  setUserType: (userType: "viewer" | "owner" | null) => void;// Updates the user state
  clearUserType: () => void;
}

export const useUserTypeStore = create<UserTypeState>()(
  persist(
    (set) => ({
      userType: null, // Initial state
      setUserType: (userType) => set({ userType }), // Action to set userType
      clearUserType: () => set({ userType: null }), // Action to clear userType
    }),
    {
      name: "user-type-store",
    }
  )
);