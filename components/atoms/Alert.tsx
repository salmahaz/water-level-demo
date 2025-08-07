"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Alert({ alertMsg, setAlertMsg }: AlertProps) {
  const [holdingMsg, setHoldingMsg] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error"| "warning">("success"); // Track alert type
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alertMsg) {
      setHoldingMsg(alertMsg);
     
      if (alertMsg.toLowerCase().includes("fail")) {
        setAlertType("error");
      } else if (alertMsg.toLowerCase().includes("warning")) {
        setAlertType("warning");
      } else {
        setAlertType("success");
      }

      setIsVisible(true);

      const clearMessage = setTimeout(() => {
        setIsVisible(false);
        setAlertMsg("");
      }, 3000);

      return () => clearTimeout(clearMessage);
    }
  }, [alertMsg, setAlertMsg]);

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
      <div
        className={`flex items-center gap-2 p-4 rounded-lg shadow-lg whitespace-nowrap ${
           alertType === "error"
            ? "bg-red-500"
            : alertType === "warning"
            ? "bg-yellow-500"
            : "bg-green-500"
        } text-white text-sm`}>
       {alertType === "error" ? (
          <FaExclamationCircle className="w-5 h-5" />
        ) : alertType === "warning" ? (
          <FaExclamationTriangle className="w-5 h-5" />
        ) : (
          <FaCheckCircle className="w-5 h-5" />
        )}
        <span>{holdingMsg}</span>
      </div>
    </div>
  );
}

type AlertProps = {
  alertMsg: string;
  setAlertMsg: (msg: string) => void;
};
