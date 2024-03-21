import React from "react";
import { motion } from "framer-motion";

interface InteractiveCardAnimationProps {
  children: React.ReactNode;
}

export default function InteractiveCardAnimation({
  children,
}: InteractiveCardAnimationProps) {
  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  );
}
