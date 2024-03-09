"use client";
import React from "react";
// auth
import { useUser } from "@auth0/nextjs-auth0/client";
// components
import Navbar from "./Navbar";
import Gutter from "@/components/Gutter";
import Page403 from "@/pages/403";
import Loading from "@/pages/Loading";
import Page500 from "@/pages/500";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Page500 />;
  }

  if (!user) {
    return <Page403 />;
  }

  return (
    <div className="w-full">
      <Navbar />
      <Gutter>{children}</Gutter>
    </div>
  );
}
