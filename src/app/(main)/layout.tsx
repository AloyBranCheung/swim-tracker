import React from "react";
// auth
import AuthGuard from "@/auth/AuthGuard";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
