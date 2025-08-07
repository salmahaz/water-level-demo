import { FaMapMarkerAlt, FaTruck, FaMoneyBillWave } from "react-icons/fa";
import { FiClock, FiCreditCard, FiDroplet } from "react-icons/fi";
import { humanReadableTime } from "@/utils/timeChanger";
import Badge from "./Badge";

interface Tank {
  id: string;
  capacity: number;
}

interface OrderHistory {
  id: string;
  orderType: string;
  addressLabel: string;
  deliveryTime: string;
  total: number;
  status: string;
  payment: string;
  truckType?: string;
  tankLocation?: string;
  capacity?: number;
  instructions?: string;
  tanks?: Tank[];
  createdAt: string;
}

interface OrderCardProps {
 orderType: string;
  order: OrderHistory;
  hideStatus?: boolean;
}

export default function OrderHistoryCard({
  orderType,
  order,
  hideStatus,
}: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">
              {orderType === "refill"
                ? `${order.capacity ?? 0}L Water Refill`
                : `${order.tanks?.length || 0} Tank${order.tanks && order.tanks.length > 1 ? "s" : ""} Cleaned`}
            </h3>
            <p className="text-sm text-gray-500">
              {humanReadableTime(order.createdAt)}
            </p>
          </div>
          {!hideStatus && <Badge title={order.status.replace("-", " ")} />}
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{order.addressLabel}</span>
          </div>

          {orderType === "refill" && (
            <div className="flex items-center gap-2">
              <FaTruck className="text-gray-400" />
              <span>
                {order.truckType === "large" ? "Large Truck" : "Small Truck"}
                {order.tankLocation ? ` – ${order.tankLocation}` : ""}
              </span>
            </div>
          )}

          {orderType === "cleaning" && order.tanks && order.tanks.length > 0 && (
            <div className="flex items-center gap-2">
              <FiDroplet className="text-gray-400" />
              <span>
                {order.tanks.map((tank, idx) => (
                  <span key={tank.id}>
                    Tank {idx + 1}: {tank.capacity}L
                    {idx < order.tanks!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400" />
            <span>
              {order.deliveryTime
                ? humanReadableTime(order.deliveryTime)
                : "ASAP"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FiCreditCard className="text-gray-400" />
            <span>{order.payment}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-gray-400" />
            <span>Total: LBP {order.total.toLocaleString("en-LB")}</span>
          </div>
          {order.instructions && (
            <div className="pt-2 border-t text-gray-500">
              <p className="text-sm">
                <span className="font-medium">Instructions: </span>
                {order.instructions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
