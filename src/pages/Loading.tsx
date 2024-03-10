import React from "react";
// components
import Wave from "@/components/Wave";

export default function Loading() {
  return (
    <div className="bg-403-gradient w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-56">
        <div className="w-full flex justify-center items-center gap-2 h-full">
          {new Array(20).fill(0).map((_, index) => (
            <Wave key={index} style={{ animationDelay: `${index * 50}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
