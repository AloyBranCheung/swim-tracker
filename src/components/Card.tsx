import React from "react";
import { twMerge, ClassNameValue } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: ClassNameValue;
  style?: React.CSSProperties | undefined;
}

export default function Card({
  children,
  className,
  onClick,
  style,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "rounded-2xl bg-gray-200 bg-opacity-35 p-4",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
