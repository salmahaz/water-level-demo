import { Order } from "@/public/interfaces/orderInterfaces";

export function isOrderValid(order: Order, distance: number): boolean {
  return (
    order?.capacity !== undefined &&
    order.capacity > 0 &&
   typeof order.tankLocation === "string" &&
    order.truckType !== undefined &&
    order.addressId !== undefined &&
    order.addressId.trim() !== "" &&
    distance > 0
  );
}
