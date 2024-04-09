import React from "react";
// components
import Navbar from "./Navbar";
import Gutter from "@/components/Gutter";

interface MainLayoutProps {
  children: React.ReactNode;
}

// auth guard
export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-app-gradient pb-20">
      <Gutter>{children}</Gutter>
      <Navbar />
    </div>
  );
}
