import Link from "next/link";
import SignupForm from "./form";

export default async function Signup() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-4xl text-primary not-italic font-bold leading-normal">
          Sign Up
        </h1>
        <div>
          <Link href={"/login"} replace>
            <span className="text-sm underline cursor-pointer">
              I have an account
            </span>
          </Link>
          {" | "}
          <Link href={"/forgot-password"} replace>
            <span className="text-sm underline cursor-pointer">
              Forget password?
            </span>
          </Link>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}
