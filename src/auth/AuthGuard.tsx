import React from "react";
// auth
import { auth as getServerSession } from "./auth-helper";
// pages
import Page403 from "@/containers/403";
// import Loading from "@/containers/Loading";
// import Page500 from "@/containers/500";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default async function AuthGuard({ children }: AuthGuardProps) {
  const session = await getServerSession();

  if (!session) {
    return <Page403 />;
  }

  return <>{children}</>;
}
