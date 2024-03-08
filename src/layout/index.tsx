import React from "react";
// components
import Navbar from "./Navbar";
import Gutter from "@/components/Gutter";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full">
      <Navbar />
      <Gutter>{children}</Gutter>
    </div>
  );
}
