"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import CrossIcon from "./icons/CrossIcon";

const StyledDialog = styled(motion.dialog)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  z-index: 100;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledDialog
          key="modal"
          ref={dialogRef}
          onCancel={onClose}
          initial={{ opacity: 0, scale: 0.5, y: 500 }}
          animate={{ opacity: 1, scale: 1, y: 0, height: "100vh" }}
          exit={{ opacity: 0, scale: 0.5, y: 500 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-app-gradient"
        >
          <Card className="flex h-full w-full flex-col gap-2 overflow-hidden">
            <div className="self-end">
              <CrossIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              />
            </div>
            <div className="h-full overflow-y-hidden rounded-2xl">
              {children}
            </div>
          </Card>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
}
