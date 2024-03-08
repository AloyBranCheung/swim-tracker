import React from "react";

interface GutterProps {
  children: React.ReactNode;
}

export default function Gutter({ children }: GutterProps) {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
}
