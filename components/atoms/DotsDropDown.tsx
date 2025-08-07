"use client";

import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { useRouter } from "next/navigation";
import Alert from "./Alert";
import { transferOwnership } from "@/actions/tanks/transferOwnerShip";
import { removeViewerAccess } from "@/actions/tanks/removeViewerAccess";

export default function DotsDropDown({
  userId,
  viewerId,
  currentTankId,
}: {
  userId: string;
  viewerId: string;
  currentTankId: string;
}) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const router = useRouter();

  const handleTransferOwnership = async () => {
    setIsLoading(true);
    try {
      await transferOwnership(currentTankId, userId, viewerId);
      setAlertMsg("Ownership transferred successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to transfer ownership:", error);
      setAlertMsg("Failed to transfer ownership. Please try again.");
    } finally {
      setIsLoading(false);
      setIsDropDown(false);
    }
  };

  const handleRemoveTank = async () => {
    setIsLoading(true);
    try {
      const result = await removeViewerAccess(currentTankId, viewerId);
      if (result.success) {
        setAlertMsg("Viewer removed successfully!");
      } else {
        setAlertMsg("Failed to remove viewer. Please try again.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDropDown(false);
    }
  };

  return (
    <div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      <div
        className="cursor-pointer text-xl px-2"
        onClick={() => setIsDropDown(!isDropDown)}>
        <BiDotsVerticalRounded />
      </div>

      {isDropDown && (
        <>
          <div className="relative">
            <div className="bg-white z-20 right-0 absolute rounded-lg border border-gray-200">
              <div
                className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={handleTransferOwnership}>
                {isLoading ? "Transferring..." : "Transfer ownership"}
              </div>
              <div
                className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg"
                onClick={handleRemoveTank}>
                {isLoading ? "Removing..." : "Delete access"}
              </div>
            </div>
          </div>

          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10 bg-transparent cursor-pointer"
            onClick={() => setIsDropDown(false)}></div>
        </>
      )}
    </div>
  );
}
