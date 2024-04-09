import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// auth
import AuthGuard from "@/auth/AuthGuard";
// components
import MainLayout from "@/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swim",
  description: "Swim tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      </body>
    </html>
  );
}
