import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface GutterProps {
  children: React.ReactNode;
  className?: ClassNameValue;
}

export default function Gutter({ children, className }: GutterProps) {
  return (
    <div
      className={twMerge(
        "w-full flex items-center justify-center h-full",
        className,
      )}
    >
      <div className="w-full max-w-5xl p-4">{children}</div>
    </div>
  );
}
