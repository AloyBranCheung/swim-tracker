"use client";
import React, { useMemo, useState } from "react";
import classNames from "classnames";
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

  // convert array to hashmap for easy access data
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

  // selected program from user selected (clicked) menu item
  const selectedProgram = currSelectedId && programsHash[currSelectedId];

  // using Map because it can be ordered (by order of entry insertion) to render the workouts in order
  const { exerciseMap, totalDistance, unit } = useMemo(() => {
    if (!selectedProgram)
      return { exerciseMap: new Map(), totalDistance: 0, unit: "" };
    return orderSwimExercises(selectedProgram.swimExercise);
  }, [selectedProgram]);

  // program is completed if it is included in the completed programs array from the DB
  const isSelectedACompletedProgram = useMemo(
    () => completedProgramIds.includes(currSelectedId as number),
    [completedProgramIds, currSelectedId],
  );

  const isActiveACompletedProgram = useMemo(
    () =>
      currActiveProgramId && completedProgramIds.includes(currActiveProgramId),
    [completedProgramIds, currActiveProgramId],
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
      // disable if the clicked program is not the current active program
      !currActiveProgramId ||
      //  or disable if is a future program
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
            // disable previewing future programs if not the current active program
            !currActiveProgramId ||
            // or disable if it is a future program (order is higher)
            program.order > programsHash[currActiveProgramId].order
          }
          key={program.id}
        >
          <Card
            className={classNames({
              // show active style if the program is the current active program and not a completed program
              "bg-gray-50":
                program.id === currActiveProgramId &&
                !isActiveACompletedProgram,
              // show disable style if program is not the active program or is a completed program
              "bg-[dimgrey]":
                program.id !== currActiveProgramId || isActiveACompletedProgram,
              // show disable style if program is ahead (order) of the active program
              "cursor-default":
                currActiveProgramId &&
                programsHash[program.id].order >
                  programsHash[currActiveProgramId].order,
            })}
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
                    // show completed icon if the current iteration is less than
                    // the user's current program rep and the selected program
                    // is the same as the active program
                    (i + 1 <= currActiveProgramRep &&
                      currActiveProgramId === selectedProgram.id) ||
                    // or is completed program
                    isSelectedACompletedProgram;

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
            // when modal is open
            isDisabled={
              // disable if the selected program is the same as the active program AND the current program reps done is the same as the goal/total program reps
              (currSelectedId === currActiveProgramId &&
                selectedProgram &&
                selectedProgram.reps === currActiveProgramRep) ||
              // or disable if the selected program is a completed program (included in the completed programs array from the DB)
              isSelectedACompletedProgram ||
              // or disable if the current active program is not the same as the
              // selected program (since we don't want the user to trigger
              // future progress from previous states e.g. (week 1 button could
              // progress week 3))
              currActiveProgramId !== (selectedProgram && selectedProgram.id)
            }
            className="h-16 w-full"
            onClick={() => {
              progressJourney();
            }}
          >
            {
              // show completed if the selected program is the active program and the completed reps is the same as the goal reps
              (currSelectedId === currActiveProgramId &&
                selectedProgram &&
                selectedProgram.reps === currActiveProgramRep) ||
              // or show completed if the active program is not the same as the selected program and the selected program is a completed program
              (currActiveProgramId !==
                (selectedProgram && selectedProgram.id) &&
                isSelectedACompletedProgram)
                ? "Completed"
                : "I have done this today!"
            }
          </Button>
        </Card>
      </Modal>
    </Card>
  );
}
