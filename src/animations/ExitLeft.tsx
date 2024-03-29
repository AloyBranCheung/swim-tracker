import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExitLeftProps {
  initial?: boolean;
  children?: React.ReactNode;
}

export default function ExitLeft({ children, initial = true }: ExitLeftProps) {
  return (
    <AnimatePresence initial={initial}>
      {children && (
        <motion.div
          initial={{ x: -999 }}
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
