"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/auth";

interface EmailPasswordFormProps {
  title: string;
  action: "forgot" | "reset";
  initialEmail?: string;
  token?: string;
  onSuccessRedirect?: string;
  sendTokenFn?: (
    email: string
  ) => Promise<{ success: boolean; message: string | string[]; link?: string }>;
  resetPasswordFn?: (
    email: string,
    token: string,
    password: string
  ) => Promise<{ success: boolean; message: string | string[]; user?: User }>;
}

export default function ActionForm({
  title,
  action,
  initialEmail = "",
  token = "",
  onSuccessRedirect = "/",
  sendTokenFn,
  resetPasswordFn,
}: EmailPasswordFormProps) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "forgot" && sendTokenFn) {
      const res = await sendTokenFn(email);
      const msgList = Array.isArray(res.message) ? res.message : [res.message];
      setMessages(msgList.filter(Boolean));
      setIsSuccess(res.success);
      if (res.success && res.link) {
        setMessages(["Reset link generated! Redirecting..."]);
        setIsSuccess(true);

        // Wait 2 seconds before redirecting
        setTimeout(() => {
          router.push(res.link!);
        }, 2000);
      }
    }

    if (action === "reset" && resetPasswordFn) {
      const res = await resetPasswordFn(email, token, password);
      const msgList = Array.isArray(res.message) ? res.message : [res.message];
      setMessages(msgList.filter(Boolean));
      setIsSuccess(res.success);
      if (res.success && res.user) {
        setUser(res.user);
        router.push(onSuccessRedirect);
      }
    }
  };

  useEffect(() => {
    setMessages([]);
    setIsSuccess(false);
    setPassword?.("");
  }, [action]);

  return (
    <Box title={title} hasShadow>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {action === "forgot" && (
          <input
            type="text"
            placeholder="Enter email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {action === "reset" && (
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        <Button
          isPrimary={action === "forgot"}
          isWarning={action === "reset"}
          text={action === "forgot" ? "Send Email" : "Reset Password"}
          className="w-full rounded-lg"
        />

        {messages.length > 0 && (
          <div
            className={`text-sm rounded-md px-3 py-2 ${
              isSuccess
                ? "text-green-700 bg-green-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            <ul className="flex flex-col gap-1 list-none">
              {messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </Box>
  );
}
