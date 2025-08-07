import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
// import { ErrorBoundary } from "react-error-boundary";
// import Error from "./error";
import FCMWrapper from "@/components/atoms/FCMWrapper";
// import { getUserIdFromSession } from "@/utils/session";
// import { getUserTanks } from "@/actions/tanks/getUserTanks";
// import { MqttProvider } from "@/mqtt/MqttProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Water Monster App",
  description: "Inovative Tools For Modern Builders",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["monster", "store", "tools", "modern", "innovative", "builders"],
  authors: [{ name: "Abdallah Moubarak" }],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-256x256.png" },
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", sizes: "192x192", url: "/icons/icon-192x192.png" },
    { rel: "icon", sizes: "256x256", url: "/icons/icon-256x256.png" },
    { rel: "icon", sizes: "384x384", url: "/icons/icon-384x384.png" },
    { rel: "icon", sizes: "512x512", url: "/icons/icon-512x512.png" },
  ],
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FCMWrapper />
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
