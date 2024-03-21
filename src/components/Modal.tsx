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
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Card className="flex h-full w-full flex-col gap-2">
            <div className="self-end">
              <CrossIcon
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              />
            </div>
            {children}
          </Card>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
}
