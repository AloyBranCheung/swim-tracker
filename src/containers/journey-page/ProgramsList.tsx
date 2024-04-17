"use client";
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
// util
import orderSwimExercises from "@/utils/swim-exercises";
// actions
import progressJourney from "@/actions/progress-journey";
// components
import Card from "@/components/Card";
import { Prisma, Program, SwimExercise } from "@prisma/client";
import InteractiveCardAnimation from "@/animations/InteractiveCardAnimation";
import ApplauseButton from "@/components/ApplauseButton";
import { isNextDay } from "@/utils/dayjs";
import HabitTrackingModal from "./HabitTrackingModal";

export type ProgramPayload = Prisma.JourneyGetPayload<{
  include: {
    swimCategory: {
      include: { programs: { include: { swimExercise: true } } };
    };
  };
}>["swimCategory"]["programs"];

interface ProgramsListProps {
  programs: ProgramPayload | null;
  currActiveProgramRep: number;
  currActiveProgramId: string | null;
  completedProgramIds: string[];
  isJourneyCompleted: boolean;
  timeLastCompleted: Date;
}

export default function ProgramsList({
  programs,
  currActiveProgramRep,
  currActiveProgramId,
  completedProgramIds,
  isJourneyCompleted,
  timeLastCompleted,
}: ProgramsListProps) {
  const [currSelectedId, setCurrSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentRep, setCurrentRep] = useState(currActiveProgramRep);
  const [lastCompleted, setLastCompleted] = useState(timeLastCompleted);

  // convert array to hashmap for easy access data
  const programsHash = useMemo(() => {
    const hash: {
      [key: string]: Program & { swimExercise: SwimExercise[] };
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
    () => completedProgramIds.includes(currSelectedId as string),
    [completedProgramIds, currSelectedId],
  );

  const isActiveACompletedProgram = useMemo(
    () =>
      currActiveProgramId && completedProgramIds.includes(currActiveProgramId),
    [completedProgramIds, currActiveProgramId],
  );

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
            className={twMerge(
              classNames({
                // show active style if the program is the current active program and not a completed program
                "bg-gray-50":
                  program.id === currActiveProgramId &&
                  !isActiveACompletedProgram,
                // show disable style if program is not the active program or is a completed program
                "bg-[dimgrey]":
                  program.id !== currActiveProgramId ||
                  isActiveACompletedProgram,
                // show disable style if program is ahead (order) of the active program
                "cursor-default":
                  currActiveProgramId &&
                  programsHash[program.id].order >
                    programsHash[currActiveProgramId].order,
              }),
              "space-between flex w-full items-center",
            )}
            onClick={() => handleClickOpenProgram(program)}
          >
            <p className="w-full font-semibold text-header-font">
              {program.name}
            </p>
            {completedProgramIds.includes(program.id) && <p>✅</p>}
          </Card>
        </InteractiveCardAnimation>
      ))
    : [];

  const handleClickProgressJourney = () => {
    if (!isNextDay(lastCompleted)) return;
    setLastCompleted(new Date());
    setCurrentRep(currentRep + 1);
    progressJourney();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrSelectedId(null);
  };

  useEffect(() => {
    if (currActiveProgramRep === 0) {
      setCurrentRep(0);
    }
  }, [currActiveProgramRep]);

  return (
    <Card className="flex flex-col gap-2">
      {menuItems}
      {isJourneyCompleted && (
        <Card className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold text-header-font">
            Congrats on finishing your swim journey!
          </p>
          <ApplauseButton />
        </Card>
      )}
      <HabitTrackingModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        exerciseMap={exerciseMap}
        totalDistance={totalDistance}
        unit={unit}
        selectedProgram={selectedProgram}
        currentRep={currentRep}
        currActiveProgramId={currActiveProgramId}
        isSelectedACompletedProgram={isSelectedACompletedProgram}
        currSelectedId={currSelectedId}
        lastCompleted={lastCompleted}
        onClickJourneyButton={handleClickProgressJourney}
      />
    </Card>
  );
}
