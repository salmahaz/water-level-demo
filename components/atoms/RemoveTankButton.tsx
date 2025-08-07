"use client";
import { useState } from "react";

import Alert from "./Alert";
import { removeViewerAccess } from "@/actions/tanks/removeViewerAccess";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { removeAgentAccess } from "@/actions/tanks/removeAgentAccess";
import ConfirmationModal from "./ConfirmationModel";

interface RemoveTankButtonProps {
  tankId: string;
  userId: string;
  userType: "viewer" | "agent";
}

export default function RemoveTankButton({
  tankId,
  userId,
  userType,
}: RemoveTankButtonProps) {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const confirmRemoveAccess = async () => {
    try {
      const response =
        userType === "viewer"
          ? await removeViewerAccess(tankId, userId)
          : await removeAgentAccess(tankId, userId);

      if (response?.success) {
        setAlertMsg("Tank access removed successfully.");
        router.push("/");
      } else {
        setAlertMsg(response?.message || "Failed to remove tank access.");
      }
    } catch (err) {
      console.error(err);
      setAlertMsg("Failed to remove tank access.");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      <div className="flex flex-col items-center">
        <Button
          isWarning
          onClick={() => setIsModalOpen(true)}
          text={"Delete Tank"}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formAction={confirmRemoveAccess}
          title="Remove Tank Access"
          message="Are you sure you want to remove this tank from your account? You will lose access to it, but the tank will remain available to the owner."
        />
      </div>
    </>
  );
}
