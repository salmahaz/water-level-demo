"use client";

import { useFCMToken } from "@/hooks/useFCMToken";
import { useNotificationListener } from "@/hooks/useNotificationListener";

export default function FCMWrapper() {
  useFCMToken();
  useNotificationListener();

  return null;
}
