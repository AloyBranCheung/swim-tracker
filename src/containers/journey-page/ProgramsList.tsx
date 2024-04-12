"use client";
import React, { useMemo, useState } from "react";
// util
import orderSwimExercises from "@/utils/swim-exercises";
// components
import Card from "@/components/Card";
import { Prisma } from "@prisma/client";
import InteractiveCardAnimation from "@/animations/InteractiveCardAnimation";
import Modal from "@/components/Modal";

type ProgramPayload = Prisma.JourneyGetPayload<{
  include: {
    swimCategory: {
      include: { programs: { include: { swimExercise: true } } };
    };
  };
}>["swimCategory"]["programs"];

interface ProgramsListProps {
  programs: ProgramPayload | null;
}

export default function ProgramsList({ programs }: ProgramsListProps) {
  const [currSelectedId, setCurrSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const programsHash = useMemo(() => {
    const hash: {
      [key: number]: Prisma.ProgramGetPayload<{
        include: { swimExercise: true };
      }>;
    } = {};

    if (!programs) return hash;

    for (const program of programs) {
      if (!(program.id in hash)) {
        hash[program.id] = program;
      }
    }

    return hash;
  }, [programs]);

  const selectedProgram = currSelectedId && programsHash[currSelectedId];

  const exercises = useMemo(() => {
    if (!selectedProgram) return {};
    return orderSwimExercises(selectedProgram.swimExercise);
  }, [selectedProgram]);

  console.log(exercises);

  const menuItems = programs
    ? programs.map((program) => (
        <InteractiveCardAnimation key={program.id}>
          <Card
            onClick={() => {
              setCurrSelectedId(program.id);
              setIsOpen(true);
            }}
          >
            <p className="font-semibold text-header-font">{program.name}</p>
          </Card>
        </InteractiveCardAnimation>
      ))
    : [];

  // TODO: make picture background component
  // TODO: modal for 'done'

  return (
    <Card className="flex flex-col gap-2">
      {menuItems}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div>helloworld</div>
      </Modal>
    </Card>
  );
}
