"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="p-4 flex flex-col items-start gap-4">
      <p>
        lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/home")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Home
        </button>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
