"use client";
import Gutter from "@/components/Gutter";
import Ticker from "@/components/Ticker403";
import React from "react";
import { signIn } from "next-auth/react";

export default function Page403() {
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-app-gradient">
      <Gutter className="relative overflow-hidden p-4">
        <div className="flex items-center justify-center">
          <Ticker />
        </div>

        <a
          onClick={() => signIn("auth0")}
          className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-2xl bg-loading-gradient p-2 px-16 font-bold text-white shadow-2xl hover:bg-primary-ui hover:text-gray-400 hover:transition-all"
        >
          Login
        </a>
      </Gutter>
    </div>
  );
}
