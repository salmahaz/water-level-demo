type LatLng = { lat: number; lng: number };

type AreaBoundary = {
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
};

export const areas: AreaBoundary[] = [
  {
    name: "Beirut",
    bounds: {
      north: 33.915,
      south: 33.85,
      east: 35.54,
      west: 35.47,
    },
  },
  {
    name: "Baabda",
    bounds: {
      north: 33.83,
      south: 33.75,
      east: 35.58,
      west: 35.5,
    },
  },
  {
    name: "Aley",
    bounds: {
      north: 33.85,
      south: 33.75,
      east: 35.68,
      west: 35.55,
    },
  },
  {
    name: "Chouf",
    bounds: {
      north: 33.75,
      south: 33.6,
      east: 35.6,
      west: 35.4,
    },
  },
  {
    name: "Metn",
    bounds: {
      north: 33.95,
      south: 33.85,
      east: 35.65,
      west: 35.55,
    },
  },
];

export function getAreaFromCoordinates({ lat, lng }: LatLng): string | null {
  for (const area of areas) {
    const { north, south, east, west } = area.bounds;
    if (lat <= north && lat >= south && lng <= east && lng >= west) {
      return area.name;
    }
  }
  return null;
}
