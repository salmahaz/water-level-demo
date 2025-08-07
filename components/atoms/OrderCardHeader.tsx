import CheckIcon from "@/components/atoms/svg/CheckIcon";
import PendingIcon from "@/components/atoms/svg/PendingIcon";
import ReadyIcon from "@/components/atoms/svg/ReadyIcon";

interface OrderCardProps {
  orderNumber: string;
  status?: string;
  date: string;
}

export default function OrderCardHeader({
  orderNumber,
  status = "pending",
  date,
}: OrderCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "done":
        return "bg-primary";
      case "pending":
        return "bg-medium_gray";
      case "new":
        return "bg-secondary";
      default:
        return "bg-medium_gray";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "done":
        return <CheckIcon />;
      case "pending":
        return <PendingIcon />;
      case "new":
        return <ReadyIcon />;
    }
  };
  return (
    <div
      className={`flex justify-between py-2 px-3 rounded-t-lg w-full ${getStatusColor()}`}>
      <div className="flex items-center gap-1">
        <div className="flex w-4">{getStatusIcon()}</div>
        <div className="flex justify-center items-center">
          <h1 className="text-xs text-white">{date}</h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-xs text-white ">{`#${orderNumber}`}</h1>
      </div>
    </div>
  );
}
