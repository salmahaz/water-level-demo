"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { getNotificationPermissionStatus, requestNotificationPermission } from "@/utils/requestNotificationPermission";


export default function Home() {
  const id = useUserStore((state) => state.id);
  const name = useUserStore((state) => state.name);

  const [permissionStatus, setPermissionStatus] = useState<
    "default" | "granted" | "denied" | "unsupported"
  >("default");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const status = getNotificationPermissionStatus();
    setPermissionStatus(status);
  }, []);

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermissionStatus(result.permission);
    if (result.granted) {
      setMessage("✅ notifications enabled successfully");
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded shadow-sm w-fit">
        user id: {id ?? "not logged in"}
      </div>

      <div className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded shadow-sm w-fit">
        user name: {name ?? "not logged in"}
      </div>

      <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded shadow-sm w-fit space-y-2">
        <p className="font-medium">
          notification status:{" "}
          <span className="text-yellow-900">{permissionStatus}</span>
        </p>

        {permissionStatus !== "granted" &&
          permissionStatus !== "unsupported" && (
            <button
              onClick={handleRequestPermission}
              className="px-3 py-1 bg-yellow-600 text-white text-sm rounded"
            >
              allow notifications
            </button>
          )}

        {message && <p className="text-sm text-gray-800">{message}</p>}
      </div>

      <p className="text-gray-700">
        lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div>
  );
}
