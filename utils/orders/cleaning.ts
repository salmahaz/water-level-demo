import { Tank } from "@/public/interfaces/orderInterfaces";

export interface CleaningOrder {
  address: string;
  tanks: Tank[];
  deliveryTime: string;
  payment: string;
  instructions: string;
  truckType: string;
  total: number;
}

export function isTankCleanerOrderValid(
  order: { tanks: Tank[]; addressId: string },
  distance: number
) {
  return (
    order.tanks.length > 0 &&
    order.tanks.every((tank) => tank.capacity > 0) &&
    order.addressId.trim() !== "" &&
    distance > 0
  );
}
