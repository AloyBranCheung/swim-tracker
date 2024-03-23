import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnterFromRightProps {
  children?: React.ReactNode;
}

export default function EnterFromRight({ children }: EnterFromRightProps) {
  return (
    <AnimatePresence>
      {children && (
        <motion.div
          initial={{ x: 999 }}
          animate={{ x: 0 }}
          exit={{ x: -999 }}
          transition={{ ease: "linear" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
