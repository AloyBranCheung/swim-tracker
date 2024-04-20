"use client";
import React from "react";
// next-auth
import { signOut } from "next-auth/react";
// components
import Button from "./Button";

export default function SignoutButton() {
  return (
    <Button
      className="h-12 w-full"
      onClick={() =>
        signOut({ callbackUrl: process.env.NEXT_PUBLIC_SIGNOUT_URL })
      }
    >
      Signout
    </Button>
  );
}
