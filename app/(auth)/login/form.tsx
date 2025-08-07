"use client";

import { login } from "@/actions/auth";
import Button from "@/components/atoms/Button";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import Input from "@/components/atoms/Input";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";


export default function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [state, formAction] = useActionState(login, null);

  useEffect(() => {
    if (state?.success) {
      setUser(state.user); // Update Zustand store with user data
      router.replace("/home"); // Redirect to home page
    }
  }, [state, setUser, router]);


  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Input placeholder="Email Address" name="email" />

        <Input
          placeholder="Password"
          inputType="password"
          name="password"
        />
      </div>
      <ErrorMessage>
        {typeof state?.message === "string" ? (
          state?.message
        ) : (
          <p>
            {state?.message?.email ||
              state?.message?.password?.map((err, i) => <li key={i}>{err}</li>)}
          </p>
        )}
      </ErrorMessage>
      <Button isPrimary text={"Log In"} />
    </form>
  );
}
