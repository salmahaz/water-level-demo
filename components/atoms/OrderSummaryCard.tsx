"use client";

import { FiMapPin, FiTruck, FiClock, FiCreditCard } from "react-icons/fi";
import Box from "@/components/atoms/Box";
import InfoItem from "./InfoItem";
import TankSVG from "./svg/TankSVG";
import { FaMoneyBillWave } from "react-icons/fa";

interface OrderSummaryCardProps {
  address: string;
  deliveryTime: string;
  payment: string;
  capacity?: number;
  truckType?: string;
  total?: number;
  tanks?: { id: string; capacity: number }[];
  orderType: string;
}

export default function OrderSummaryCard({
  address,
  deliveryTime,
  payment,
  total,
  truckType = "",
  capacity = 0,
  tanks = [],
  orderType,
}: OrderSummaryCardProps) {
  const totalCapacity =
    orderType === "cleaning"
      ? tanks.reduce((sum, tank) => sum + tank.capacity, 0)
      : capacity;

  return (
    <Box title="Order Summary">
      <div className="flex flex-col gap-4">
        <InfoItem
          icon={<FiMapPin className="w-5 h-5 text-gray-400" />}
          label="Address"
          value={address}
        />

        {orderType === "refill" && (
          <InfoItem
            icon={<FiTruck className="w-5 h-5 text-gray-400" />}
            label="Truck Type"
            value={truckType === "large" ? "Large Truck" : "Small Truck"}
          />
        )}

        <InfoItem
          icon={<TankSVG level={75} tankType="water" />}
          label={orderType === "refill" ? "Required Capacity" : "Tank Capacity"}
          value={`${totalCapacity} Liters`}
        />

        <InfoItem
          icon={<FiClock className="w-5 h-5 text-gray-400" />}
          label="Required Time"
          value={deliveryTime ? "Scheduled" : "ASAP"}
        />

        <InfoItem
          icon={<FiCreditCard className="w-5 h-5 text-gray-400" />}
          label="Payment Method"
          value={payment}
        />
        <InfoItem
          icon={<FaMoneyBillWave className="w-5 h-5 text-gray-400" />}
          label="Total Price"
          value={`LBP ${total?.toLocaleString("en-LB")}`}
        />
      </div>
    </Box>
  );
}
