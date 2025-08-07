//import Link from "next/link";
import LoginForm from "./form";

export default async function Login() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-4xl text-primary not-italic font-bold leading-normal">
          Log In
        </h1>
        {/* <div>
          <Link href={"/signup"} replace>
            <span className="text-sm underline cursor-pointer">
              I don&apos;t have an account
            </span>
          </Link>
          {" | "}
          <Link href={"/forgot-password"} replace>
            <span className="text-sm underline cursor-pointer">
              Forget password?
            </span>
          </Link>
        </div> */}
      </div>
      <LoginForm />
    </div>
  );
}
