import { JSX } from "react";

interface InfoItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 text-gray-400">{icon}</div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-xs">{value}</p>
      </div>
    </div>
  );
}
