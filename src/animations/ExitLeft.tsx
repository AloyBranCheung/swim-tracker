import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExitLeftProps {
  children?: React.ReactNode;
}

export default function ExitLeft({ children }: ExitLeftProps) {
  return (
    <AnimatePresence>
      {children && <motion.div exit={{ x: -999 }}>{children}</motion.div>}
    </AnimatePresence>
  );
}
