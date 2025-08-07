"use client";

import { FaPlus } from "react-icons/fa";
import Box from "./Box";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import Button from "./Button";

export default function AddDeviceButton() {
  const userId = useUserStore((state) => state.id);
  const isLoggedIn = Boolean(userId);

  return (
    <div className="p-3">
      <Link href={isLoggedIn ? "/add-water-tank" : "/login"}>
        {isLoggedIn ? (
          <Box hasShadow={true}>
            <div className="flex justify-between items-center p-2">
              <div>Add device</div>
              <div>
                <FaPlus />
              </div>
            </div>
          </Box>
        ) : (
          <Button text="Login" />
        )}
      </Link>
    </div>
  );
}
