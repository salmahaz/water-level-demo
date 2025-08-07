export interface ProviderInterface {
  _id: string;
  name: string;
  email: string;
  prefix?: string;
  phoneNumber?: string;
  truckType?: string | null;
  address?: { label: string } | null;
}