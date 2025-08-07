"use client";

import Image from "next/image";
import Button from "./Button";
import { useState } from "react";
import Alert from "./Alert";

interface SensorCardProps {
  imageUrl: string;
  title: string;
  buttonText?: string;
  connectionType: string;
  price: number;
}

export default function SensorCard({
  imageUrl,
  title,
  buttonText = "Order Now",
  connectionType,
  price,
}: SensorCardProps) {
  const phoneNumber = "96171390697";
  const message = "Hello, I want to buy a water level sensor.";
  const [alertMsg, setAlertMsg] = useState("");

  const handleOrderClick = async () => {
    try {
      setAlertMsg("");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      const newWindow = window.open(whatsappUrl, "_blank");

      if (!newWindow) {
        throw new Error(
          "Failed to open WhatsApp. Please check your popup settings."
        );
      }
    } catch (err) {
      setAlertMsg("Failed to open WhatsApp");
      console.error("Error opening WhatsApp:", err);
    }
  };

  return (
    <>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      <div className="flex flex-col bg-white w-full border border-gray-200 rounded-2xl overflow-hidden">
        <div className="max-h-40 overflow-hidden bg-primary">
          <Image
            src={imageUrl}
            alt="Product Image"
            width={400}
            height={400}
            className="max-h-40 object-contain"
          />
        </div>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-sm text-gray-500">{connectionType}</p>
            </div>
            <p className="text-xl font-bold">${price}</p>
          </div>

          <Button
            text={buttonText}
            isPrimary
            className="w-full"
            onClick={handleOrderClick}
          />
        </div>
      </div>
    </>
  );
}
