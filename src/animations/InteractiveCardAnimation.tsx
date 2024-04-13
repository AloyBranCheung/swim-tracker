import React from "react";
import { motion } from "framer-motion";

interface InteractiveCardAnimationProps {
  children: React.ReactNode;
  isDisabled?: boolean;
}

export default function InteractiveCardAnimation({
  children,
  isDisabled,
}: InteractiveCardAnimationProps) {
  return (
    <motion.div
      className="cursor-pointer"
      whileHover={!isDisabled ? { scale: 1.01 } : undefined}
      whileTap={!isDisabled ? { scale: 0.99 } : undefined}
    >
      {children}
    </motion.div>
  );
}
