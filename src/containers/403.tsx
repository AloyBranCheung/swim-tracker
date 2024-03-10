import Gutter from "@/components/Gutter";
import Ticker from "@/components/Ticker403";
import React from "react";

export default function Page403() {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-app-gradient">
      <Gutter className="overflow-hidden relative p-4">
        <div className="flex items-center justify-center">
          {/* <div className="w-96 h-80 flex flex-col items-center justify-center gap-2 bg-gray-600 bg-opacity-15 rounded-2xl shadow-2xl p-4 overflow-hidden">
            {new Array(5).fill(0).map((_, i) => (
              <h1
                key={i}
                className="text-5xl text-gray-200 opacity-35 text-center"
              >
                Access Denied
              </h1>
            ))}
          </div> */}
          <Ticker />
        </div>

        <a
          href="/api/auth/login"
          className="text-white hover:text-gray-400 font-bold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-loading-gradient hover:bg-403-btn-gradient-hover p-2 px-16 rounded-2xl shadow-2xl hover:transition-all hover:scale-110"
        >
          Login
        </a>
      </Gutter>
    </div>
  );
}
