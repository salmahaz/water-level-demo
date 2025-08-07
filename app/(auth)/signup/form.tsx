"use client";

import { signup } from "@/actions/auth";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/atoms/Dropdown";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import Input from "@/components/atoms/Input";
import { Country, countryData } from "@/public/data/countries";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function SignupForm() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [state, formAction] = useActionState(signup, null);
 const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [localError, setLocalError] = useState("");
  
  useEffect(() => {
    if (state?.success) {
      setUser(state.user);
      router.replace("/home");
    }
  }, [state, setUser, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!agreedToTerms) {
      e.preventDefault();
      setLocalError("You must agree to the Terms and Conditions to continue.");
      return;
    }
    setLocalError("");
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Input placeholder="Full Name *" name="fullname" />
        <Input placeholder="Email Address *" name="email" />
        <div className="flex gap-2">
          <Dropdown
            options={countryData.map((country: Country) => country.prefix)}
            selectedOption={"+961"}
            name={"prefix"}
          />
          <Input placeholder="Phone Number *" name="number" inputType="number" />
        </div>
        <Input placeholder="Password *" inputType="password" name="password" />
         {/* Terms checkbox */}
        <div className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-gray-600">
            I agree to the{" "}
            <a href="/terms" target="_blank" className="text-primary underline">
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <div>
        <ErrorMessage>
           {localError ||
            (typeof state?.message === "string" ? (
              state.message
            ) : (
              <p>
                {state?.message?.name ||
                  state?.message?.email ||
                   state?.message?.phoneNumber ||
                  state?.message?.password?.map((err, i) => <li key={i}>{err}</li>)}
              </p>
            ))}
        </ErrorMessage>
        <Button isPrimary text={"Sign Up"} />
      </div>
    </form>
  );
}
