import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/session";

const authRoutes = [
  "/menu",
  "/add-water-tank",
  "/my-balance",
  "/saved-cards",
  "/topup-history",
  "/service-orders-history",
  "/product-orders-history",
  "/addresses",
  "/history",
  "/profile",
  "/tank-settings"
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/manifest.json") {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.some((x) => path.startsWith(x));

  const cookie = req.cookies.get("session")?.value;

  try {
    const session = await decrypt(cookie);

    if (isAuthRoute && !session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } catch (error) {
    console.error("Failed to decrypt session", error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};
