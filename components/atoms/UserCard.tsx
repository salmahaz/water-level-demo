"use client";

import { FaWhatsapp } from "react-icons/fa";
import Box from "./Box";
import Link from "next/link";

export interface UserCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    prefix?: string;
    phoneNumber?: string;
    truckType?: string | null;
    address?: { label: string } | null;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const message = encodeURIComponent(
    `Hello ${user.name}, I'm contacting you from Water Monster App regarding my order.`
  );
  const whatsappUrl =
    user.phoneNumber && user.prefix
      ? `https://wa.me/${user.prefix}${user.phoneNumber.replace(/\D/g, "")}?text=${message}`
      : null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Box>
      <>
        {/* Header */}
        <div className="flex  gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold text-base">
            {initials}
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-semibold text-sm text-gray-800">
              {user.name}
            </div>
            <div className="text-xs text-gray-600">
              {[user.prefix, user.phoneNumber].filter(Boolean).join(" ")}
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        {whatsappUrl && (
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-xs font-medium text-white bg-green-500 hover:bg-green-600 py-2 rounded-md transition"
          >
            <div className="flex justify-center items-center gap-2">
              <FaWhatsapp className="text-sm" />
              Chat on WhatsApp
            </div>
          </Link>
        )}
      </>
    </Box>
  );
}
