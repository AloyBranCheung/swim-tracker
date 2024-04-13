"use client";
import React, { useMemo, useState } from "react";
// util
import orderSwimExercises from "@/utils/swim-exercises";
// actions
import progressJourney from "@/actions/progress-journey";
// components
import Card from "@/components/Card";
import { Prisma, Program, SwimExercise } from "@prisma/client";
import InteractiveCardAnimation from "@/animations/InteractiveCardAnimation";
import Modal from "@/components/Modal";
import ExerciseSection from "../plans-page/ExerciseSection";
import Button from "@/components/Button";

type ProgramPayload = Prisma.JourneyGetPayload<{
  include: {
    swimCategory: {
      include: { programs: { include: { swimExercise: true } } };
    };
  };
}>["swimCategory"]["programs"];

interface ProgramsListProps {
  programs: ProgramPayload | null;
  currActiveProgramRep: number;
  currActiveProgramId: number | null;
  completedProgramIds: number[];
}

export default function ProgramsList({
  programs,
  currActiveProgramRep,
  currActiveProgramId,
  completedProgramIds,
}: ProgramsListProps) {
  const [currSelectedId, setCurrSelectedId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const programsHash = useMemo(() => {
    const hash: {
      [key: number]: Program & { swimExercise: SwimExercise[] };
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

  const { exerciseMap, totalDistance, unit } = useMemo(() => {
    if (!selectedProgram)
      return { exerciseMap: new Map(), totalDistance: 0, unit: "" };
    return orderSwimExercises(selectedProgram.swimExercise);
  }, [selectedProgram]);

  const isCompletedProgram = useMemo(
    () => completedProgramIds.includes(currSelectedId as number),
    [completedProgramIds, currSelectedId],
  );

  const exerciseSections = useMemo(() => {
    const sections: JSX.Element[] = [];
    // es2015
    // for (const [type, exercises] of exerciseMap) {
    //   sections.push(
    //     <ExerciseSection key={type} type={type} exercises={exercises} />,
    //   );
    // }
    exerciseMap.forEach((exercises, type) => {
      sections.push(
        <ExerciseSection key={type} type={type} exercises={exercises} />,
      );
    });
    return sections;
  }, [exerciseMap]);

  const handleClickOpenProgram = (program: Program) => {
    if (
      !currActiveProgramId ||
      program.order > programsHash[currActiveProgramId].order
    )
      return;
    setCurrSelectedId(program.id);
    setIsOpen(true);
  };

  const menuItems = programs
    ? programs.map((program) => (
        <InteractiveCardAnimation
          isDisabled={
            !currActiveProgramId ||
            program.order > programsHash[currActiveProgramId].order
          }
          key={program.id}
        >
          <Card
            className={`${program.id === currActiveProgramId ? "bg-gray-50" : "bg-[dimgrey] disabled:cursor-not-allowed"}`}
            onClick={() => handleClickOpenProgram(program)}
          >
            <p className="font-semibold text-header-font">{program.name}</p>
          </Card>
        </InteractiveCardAnimation>
      ))
    : [];

  return (
    <Card className="flex flex-col gap-2">
      {menuItems}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setCurrSelectedId(null);
        }}
      >
        <Card className="flex h-full flex-col gap-4">
          <div className="h-full overflow-y-scroll">
            <div className="flex flex-col gap-2">{exerciseSections}</div>
            <h3 className="text-lg font-semibold">
              Total: {totalDistance}
              {unit}
            </h3>
          </div>
          <Card className="flex flex-col items-center justify-center gap-2">
            <p>
              Do it {selectedProgram && selectedProgram.reps} times to complete
            </p>
            <div className="flex items-center justify-center gap-2">
              {selectedProgram &&
                new Array(selectedProgram.reps).fill(0).map((_, i) => {
                  const isRepCompleted =
                    (i + 1 <= currActiveProgramRep &&
                      currActiveProgramId === selectedProgram.id) ||
                    isCompletedProgram;

                  return (
                    <div
                      key={i * Math.random()}
                      className={`flex h-8 w-8 items-center justify-center rounded-full p-1 ${isRepCompleted ? "bg-gray-50" : "bg-gray-400"}`}
                    >
                      <p className="text-center">
                        {isRepCompleted ? "✔️" : i + 1}
                      </p>
                    </div>
                  );
                })}
            </div>
          </Card>
          <Button
            isDisabled={
              (currSelectedId === currActiveProgramId &&
                selectedProgram &&
                selectedProgram.reps === currActiveProgramRep) ||
              isCompletedProgram ||
              currActiveProgramId !== (selectedProgram && selectedProgram.id)
            }
            className="h-16 w-full"
            onClick={() => {
              progressJourney();
            }}
          >
            {(currSelectedId === currActiveProgramId &&
              selectedProgram &&
              selectedProgram.reps === currActiveProgramRep) ||
            (currActiveProgramId !== (selectedProgram && selectedProgram.id) &&
              isCompletedProgram)
              ? "Completed"
              : "I have done this today!"}
          </Button>
        </Card>
      </Modal>
    </Card>
  );
}
