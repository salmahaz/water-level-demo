export type TankDataType = {
    userId: string;
    name?: string;
    size?: number;
    height?: number;
    serialNumber?: string;
    location?: { long: string; lat: string };
    threshold?: number;
    connectionType?: string;
    tankType?:string;
    sensorState?: boolean;
  };