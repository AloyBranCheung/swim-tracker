import React from "react";
import { motion } from "framer-motion";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: ClassNameValue;
  type?: HTMLButtonElement["type"];
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  isDisabled = false,
  isLoading = false,
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <motion.button
      disabled={isDisabled}
      {...(isDisabled ? {} : { whileTap: { scale: 0.97 } })}
      className={twMerge(
        `h-10 w-fit rounded-2xl bg-secondary-ui px-4 font-medium text-primary-font shadow-lg hover:bg-gray-200 ${isDisabled && "bg-gray-600 hover:bg-gray-600"}`,
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {isLoading && "Loading..."}
      {!isLoading && children}
    </motion.button>
  );
}
