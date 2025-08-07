import { create } from "zustand";

interface TankState {
  tankId: string | null;
  setTankId: (id: string) => void;
  serialNumber: string | null;
  setSerialNumber: (serial: string) => void; 
}

export const useTankStore = create<TankState>((set) => ({
  tankId: null, // Default value
  serialNumber: null,
  setTankId: (id) => set({ tankId: id }), // Function to update the state
  setSerialNumber: (serial) => set({ serialNumber: serial }),
}));
