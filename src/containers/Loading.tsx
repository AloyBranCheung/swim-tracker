import React from "react";
// components
import Wave from "@/components/Wave";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-app-gradient">
      <div className="flex h-56 w-3/4 flex-col items-center justify-center gap-2">
        <div className="flex h-full w-full items-center justify-center gap-2">
          {new Array(20).fill(0).map((_, index) => (
            <Wave key={index} style={{ animationDelay: `${index * 50}ms` }} />
          ))}
        </div>
        <h2 className="text-xl text-gray-300">Loading...</h2>
      </div>
    </div>
  );
}
