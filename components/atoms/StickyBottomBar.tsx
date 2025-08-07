import React from "react";
import Button from "@/components/atoms/Button";

interface StickyBottomBarProps {
  total: number;
  primaryButton: {
    text: string;
    onClick: () => void;
    isDisabled?: boolean;
  };
}

export default function StickyBottomBar({
  total,
  primaryButton,
}: StickyBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 pb-6 bg-white border-t shadow-md z-30 md:static md:rounded-xl md:border md:shadow-none mx-auto max-w-lg">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Total payment</span>
          <span className="font-bold text-xl text-primary">
            LBP {total.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            text={primaryButton.text}
            isPrimary
            className="w-full"
            onClick={primaryButton.onClick}
            isDisabled={primaryButton.isDisabled}
          />
        </div>
      </div>
    </div>
  );
}
