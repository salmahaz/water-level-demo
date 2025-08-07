// import { cleaningFees } from "@/public/data/orders";
// import { getOrderPricing } from "./getOrderPricing";

// interface InvoiceItem {
//   label: string;
//   value: number;
//   visible?: boolean;
//   isTotal?: boolean;
//   highlight?: boolean;
// }

// interface GetInvoiceItemsProps {
//   orderType: string;
//   pricing: ReturnType<typeof getOrderPricing>;
//   truckType?: string;
//   tanks?: { id: string; capacity: number }[];
//   voucherApplied?: boolean;
// }

// export function getInvoiceItems({
//   orderType,
//   pricing,
//   truckType = "",
//   tanks = [],
//   voucherApplied = false,
// }: GetInvoiceItemsProps): InvoiceItem[] {
//   const isVisible = pricing.subtotal > 0;

//   if (orderType === "refill") {
//     const truckLabel = truckType === "large" ? "Large Truck" : "Small Truck";

//     return voucherApplied
//       ? [
//           { label: "Subtotal", value: pricing.subtotal },
//           {
//             label: `Base Delivery (${truckLabel})`,
//             value: pricing.baseDelivery,
//             visible: isVisible,
//           },
//           { label: "Rush Fee", value: pricing.rushFee, visible: isVisible },
//           {
//             label: "Tank Handling",
//             value: pricing.tankHandling,
//             visible: isVisible,
//           },
//           {
//             label: "Truck Distance Fee (km)",
//             value: pricing.distanceFee,
//             visible: isVisible,
//           },
//           {
//             label: "Total",
//             value: pricing.total,
//             highlight: true,
//             isTotal: true,
//           },
//           {
//             label: "Total (Voucher Applied 🎉)",
//             value: 0,
//             highlight: true,
//           },
//         ]
//       : [
//           { label: "Water Cost", value: pricing.subtotal },
//           {
//             label: `Base Delivery (${truckLabel})`,
//             value: pricing.baseDelivery,
//             visible: isVisible,
//           },
//           { label: "Rush Fee", value: pricing.rushFee, visible: isVisible },
//           {
//             label: "Floor Handling",
//             value: pricing.tankHandling,
//             visible: isVisible,
//           },
//           {
//             label: "Truck Distance Fee (km)",
//             value: pricing.distanceFee,
//             visible: isVisible,
//           },
//           {
//             label: "Total",
//             value: pricing.total,
//             highlight: true,
//             isTotal: true,
//           },
//         ];
//   }

//   // Cleaning
//   const tankItems: InvoiceItem[] = tanks
//     .filter((t) => t.capacity > 0)
//     .map((tank, idx) => ({
//       label: `Tank ${idx + 1} (${tank.capacity}L)`,
//       value: cleaningFees[tank.capacity],
//     }));

//   return [
//     ...tankItems,
//     { label: "Subtotal", value: pricing.subtotal },
//     { label: "Rush Fee", value: pricing.rushFee, visible: isVisible },
//     {
//       label: "Truck Distance Fee (km)",
//       value: pricing.distanceFee,
//       visible: isVisible,
//     },
//     { label: "Total", value: pricing.total, highlight: true, isTotal: true },
//   ];
// }
import { cleaningFees } from "@/public/data/orders";
import { getOrderPricing } from "./getOrderPricing";

interface InvoiceItem {
  label: string;
  value: number;
  visible?: boolean;
  isTotal?: boolean;
  highlight?: boolean;
}

interface GetInvoiceItemsProps {
  orderType: string;
  pricing: ReturnType<typeof getOrderPricing>;
  truckType?: string;
  tanks?: { id: string; capacity: number }[];
  voucherApplied?: boolean;
  voucherCode?: string;
}

export function getInvoiceItems({
  orderType,
  pricing,
  truckType = "",
  tanks = [],
  voucherApplied = false,
  voucherCode = "",
}: GetInvoiceItemsProps): InvoiceItem[] {
  const isVisible = pricing.subtotal > 0;
  const isWATER2025 = voucherApplied && voucherCode === "WATER2025";
  const isOtherVoucher = voucherApplied && !isWATER2025;

  if (orderType === "refill") {
    const truckLabel = truckType === "large" ? "Large Truck" : "Small Truck";

    const items: InvoiceItem[] = [
      { label: "Water Cost", value: pricing.subtotal },
      {
        label: `Base Delivery (${truckLabel})`,
        value: pricing.baseDelivery,
        visible: isVisible,
      },
      { label: "Rush Fee", value: pricing.rushFee, visible: isVisible },
      {
        label: "Floor Handling",
        value: pricing.tankHandling,
        visible: isVisible,
      },
      {
        label: "Truck Distance Fee (km)",
        value: pricing.distanceFee,
        visible: isVisible,
      },
      {
        label: "Total",
        value: pricing.total,
        highlight: true,
        isTotal: true,
      },
    ];

    // Show only one of these based on voucher code
    if (isWATER2025) {
      items.push({
        label: "Total (Discount Applied 🎉)",
        value: pricing.total - 150000,
        visible: true,
      });
    } else if (isOtherVoucher) {
      items.push({
        label: "Total (Voucher Applied 🎉)",
        value: 0,
        highlight: true,
      });
    }

    return items;
  }

  // Cleaning order
  const tankItems: InvoiceItem[] = tanks
    .filter((t) => t.capacity > 0)
    .map((tank, idx) => ({
      label: `Tank ${idx + 1} (${tank.capacity}L)`,
      value: cleaningFees[tank.capacity],
    }));

  const items: InvoiceItem[] = [
    ...tankItems,
    { label: "Subtotal", value: pricing.subtotal },
    { label: "Rush Fee", value: pricing.rushFee, visible: isVisible },
    {
      label: "Truck Distance Fee (km)",
      value: pricing.distanceFee,
      visible: isVisible,
    },
    { label: "Total", value: pricing.total, highlight: true, isTotal: true },
  ];

  // Same logic for cleaning orders
  if (isWATER2025) {
    items.push({
      label: "Total (Discount Applied 🎉)",
      value: -150000,
      visible: true,
    });
  } else if (isOtherVoucher) {
    items.push({
      label: "Total (Voucher Applied 🎉)",
      value: 0,
      highlight: true,
    });
  }

  return items;
}
