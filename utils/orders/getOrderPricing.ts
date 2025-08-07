import {
  pricePerLiter,
  cleaningFees,
  destinationFees,
  rushFees,
  baseDeliveryFees,
  tankHandlingFees,
} from "@/public/data/orders";
import { Order } from "@/public/interfaces/orderInterfaces";

export function getOrderPricing(
  order: Order,
  distance: number,
  orderType: "cleaning" | "refill"
) {
  const rushFee =
    order.deliveryTime === "" ? rushFees[orderType].now : rushFees[orderType].notNow;

  const distanceFee = distance * destinationFees[orderType];

  if (orderType === "refill") {
    const baseDelivery =
      (order.capacity &&
        order.truckType &&
        baseDeliveryFees[order.truckType] + 200 * order.capacity) ||
      0;

    let tankHandling = 0;

    if (order?.tankLocation) {
      if (order.tankLocation === "Roof") {
        const floors = Math.max(1, order.buildingFloors ?? 1);
        const baseLP = 990_000; // 11 * 90,000
        const extraPerFloor = 90_000; // 1 * 90,000
        tankHandling = baseLP + (floors - 1) * extraPerFloor;
      } else {
        tankHandling = tankHandlingFees[order.tankLocation] || 0;
      }
    }

    const subtotal =
      order.capacity && order.capacity > 0 ? order.capacity * pricePerLiter : 0;
    const deliveryCharge =
      subtotal > 0 ? baseDelivery + rushFee + tankHandling + distanceFee : 0;
    let total = subtotal + deliveryCharge;
    const points = subtotal > 0 ? Math.floor(subtotal / 60) : 0;


    return {
      subtotal,
      baseDelivery,
      rushFee,
      tankHandling,
      distanceFee,
      deliveryCharge,
      total,
      points,
    };
  }

  // Cleaning
  const tanks = order.tanks || [];
  const subtotal = tanks
    .filter((t) => t.capacity > 0)
    .reduce((sum, t) => sum + cleaningFees[t.capacity], 0);
  if (subtotal === 0) {
    return {
      subtotal: 0,
      baseDelivery: 0,
      rushFee: 0,
      tankHandling: 0,
      distanceFee: 0,
      deliveryCharge: 0,
      total: 0,
      points: 0,
    };
  }

  let total = subtotal + rushFee + distanceFee;
  const points = subtotal > 0 ? Math.floor(subtotal / 60) : 0;


  return {
    subtotal,
    baseDelivery: 0,
    rushFee,
    tankHandling: 0,
    distanceFee,
    deliveryCharge: rushFee + distanceFee,
    total,
    points,
  };
}
