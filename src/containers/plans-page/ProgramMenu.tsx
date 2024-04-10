"use client";
import React, { useState } from "react";
// action
import startJourney from "@/actions/start-journey";
// types
import { Programs } from "./SwimCategory";
// components
import ProgramItemNavigation from "./ProgramItemNavigation";
import Modal from "@/components/Modal";
import { SwimExercise } from "@prisma/client";
import ProgramDetails from "./ProgramDetails";
import Button from "@/components/Button";

interface ProgramMenuProps {
  programs: Programs["programs"];
  categoryName: Programs["category"];
  isOpen: boolean;
  onClose: () => void;
  categoryId: number;
}

export default function ProgramMenu({
  programs,
  isOpen,
  onClose,
  categoryName,
  categoryId,
}: ProgramMenuProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  );
  const [swimExercises, setSwimExercises] = useState<SwimExercise[]>([]);

  const menuItems = programs.map((program) => (
    <ProgramItemNavigation
      key={program.id}
      name={program.name}
      onClick={() => {
        setSelectedProgramId(program.id);
        setSwimExercises(program.swimExercise);
      }}
      isSelected={selectedProgramId === program.id}
    />
  ));

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedProgramId(null);
        setSwimExercises([]);
        onClose();
      }}
    >
      <div className="flex h-full flex-col gap-2">
        <div>
          <h1 className="mb-8 text-3xl text-header-font">{categoryName}</h1>
          <div className="overflow-x-hidden">
            {swimExercises.length < 1 ? (
              menuItems
            ) : (
              <ProgramDetails
                swimExercises={swimExercises}
                onClickBack={() => {
                  setSelectedProgramId(null);
                  setSwimExercises([]);
                }}
              />
            )}
          </div>
        </div>
        {swimExercises.length < 1 && (
          <Button className="w-full" onClick={() => startJourney(categoryId)}>
            Start Journey
          </Button>
        )}
      </div>
    </Modal>
  );
}
