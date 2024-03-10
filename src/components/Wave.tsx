import React, { HTMLAttributes } from "react";
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
        "w-2 h-20 animate-pulse bg-loading-gradient rounded-2xl",
        className,
      )}
    />
  );
}
