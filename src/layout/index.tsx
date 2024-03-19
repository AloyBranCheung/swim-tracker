"use client";
import React from "react";
// auth
import { useUser } from "@auth0/nextjs-auth0/client";
// components
import Navbar from "./Navbar";
import Gutter from "@/components/Gutter";
import Page403 from "@/containers/403";
import Loading from "@/containers/Loading";
import Page500 from "@/containers/500";

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
    <div className="min-h-screen w-full bg-app-gradient pb-20">
      <Gutter>{children}</Gutter>
      <Navbar />
    </div>
  );
}
