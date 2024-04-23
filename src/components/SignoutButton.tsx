"use client";
import React, { useState } from "react";
// next-auth
import { signOut } from "next-auth/react";
// components
import Button from "./Button";

export default function SignoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      isLoading={isLoading}
      isDisabled={isLoading}
      className="h-12 w-full"
      onClick={() => {
        setIsLoading(true);
        signOut({ callbackUrl: process.env.NEXT_PUBLIC_SIGNOUT_URL });
      }}
    >
      Signout
    </Button>
  );
}
