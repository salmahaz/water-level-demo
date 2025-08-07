"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { useUserStore } from "@/store/userStore";
import Button from "@/components/atoms/Button";

export default function LogoutButton() {
  const router = useRouter();
  const resetUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    await logout();     
    resetUser();        
    router.push("/");   
  };

  return <Button isWarning text="Logout" onClick={handleLogout} />;
}