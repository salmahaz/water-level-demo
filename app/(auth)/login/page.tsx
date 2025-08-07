//import Link from "next/link";
import LoginForm from "./form";

export default async function Login() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h1 className="text-4xl text-primary not-italic font-bold leading-normal">
          Log In
        </h1>
       
      </div>
      <LoginForm />
    </div>
  );
}
