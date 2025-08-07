import { BiWater } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { humanReadableTime } from "@/utils/timeChanger";
import { WaterTank } from "@/models/Tank";
import LoadingSpinner from "./svg/LoadingSpinner";

interface TankDetailsProps {
  tank: WaterTank;
  waterLevel: number;
  timeStamp: Date | null;
  isLoading: boolean;
}

export default function TankDetails({
  tank,
  waterLevel,
  timeStamp,
  isLoading,
}: TankDetailsProps) {
  return (
    <>
      <div className="flex items-center gap-1 text-gray-500">
        <BiWater />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <span>{(tank?.size * waterLevel) / 100} liter</span>
        )}
        {isLoading ? <></> : <span>({waterLevel}%)</span>}
      </div>

      <div className="flex items-center gap-1 text-gray-500">
        <HiOutlineClock />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <span>{humanReadableTime(timeStamp?.toString() || "")}</span>
        )}
      </div>
    </>
  );
}
