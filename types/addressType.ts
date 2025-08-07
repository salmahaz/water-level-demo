export interface AddressLocation {
  lat: number;
  lng: number;
}

export interface AddressType {
  id: string;
  label: string;
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  instructions?: string;
}