export const truckTypes = [
  {
    key: "small",
    label: "Small Truck",
    img: "/img/png/smallTruck.png",
    desc: "Best for tight spaces and small deliveries.",
  },
  {
    key: "large",
    label: "Large Truck",
    img: "/img/png/largeTruck.png",
    desc: "For big tanks and easy access locations.",
  },
];

export const tankLocation = [
  { key: "Street", label: "Street" },
  { key: "Roof", label: "Roof" },
  { key: "Parking", label: "Parking" },
];

export const pricePerLiter = 300;

export const rushFees = {
  cleaning: {
    now: 200000,
    notNow: 0,
  },
  refill: {
    now: 100000,
    notNow: 0,
  },
};

export const destinationFees = {
  cleaning: 80000,
  refill: 20000,
};

export const baseDeliveryFees: Record<string, number> = {
  small: 50000,
  large: 150000,
};

export const tankHandlingFees: Record<string, number> = {
  Parking: 50000,
  Roof: 200000,
  Street: 50000,
};

export const capacities = [1000, 2000, 3000, 4000, 8000, 10000];

export const cleaningFees: Record<number, number> = {
  1000: 1000000,
  2000: 1500000,
  3000: 2000000,
  4000: 2500000,
  8000: 4000000,
  10000: 5000000,
};
