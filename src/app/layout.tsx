/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sync | Home",
  description: "Welcome to Sync, a messaging platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
