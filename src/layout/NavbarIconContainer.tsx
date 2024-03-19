import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface NavbarIconContainerProps {
  className?: ClassNameValue;
  children: React.ReactNode;
}

export default function NavbarIconContainer({
  className,
  children,
}: NavbarIconContainerProps) {
  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center gap-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
