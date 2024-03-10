import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// auth
import { UserProvider } from "@auth0/nextjs-auth0/client";
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
      <UserProvider>
        <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </UserProvider>
    </html>
  );
}
