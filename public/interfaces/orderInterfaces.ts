import { AddressDetails } from "@/models/User";

export interface Tank {
  id: string;
  capacity: number;
}

export interface Order {
  _id: string;
  addressId?: string;
  addressLabel?: string;
  addressInstructions?: string;
  pinCode: number;
  deliveryTime?: string;
  address?: AddressDetails;
  payment?: string;
  orderType?: string;
  truckType?: string;
  capacity?: number;
  tankLocation?: string;
  tanks?: { id: string; capacity: number }[];
  total: number;
  cancelled?: boolean;
  voucherCode?: string | null;
  assignedTo?: string;
  status?: "pending" | "on-going" | "completed";
  requiresRooftopRefill?: boolean;
  buildingFloors?: number | null;
}
