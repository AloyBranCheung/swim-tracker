import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface WaveProps {
  className?: ClassNameValue;
  style?: React.CSSProperties;
}

export default function Wave({ className, style }: WaveProps) {
  return (
    <div
      style={style}
      className={twMerge(
        "h-20 w-2 animate-pulse rounded-2xl bg-loading-gradient",
        className,
      )}
    />
  );
}
