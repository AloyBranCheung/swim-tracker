import React from "react";
// types
import { Programs } from "./SwimCategory";
// components
import Modal from "@/components/Modal";
import ProgramNavigation from "./ProgramNavigation";

interface CategoryModalProps {
  programs: Programs["programs"];
  categoryName: Programs["category"];
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({
  programs,
  categoryName,
  isOpen,
  onClose,
}: CategoryModalProps) {
  const programNavigation = programs.map((program) => (
    <ProgramNavigation
      key={program.id}
      name={program.name}
      swimExercise={program.swimExercise}
    />
  ));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <h1 className="mb-8 text-3xl text-header-font">{categoryName}</h1>
        <div>{programNavigation}</div>
      </div>
    </Modal>
  );
}
