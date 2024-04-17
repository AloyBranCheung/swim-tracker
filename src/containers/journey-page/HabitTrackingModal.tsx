import React, { useMemo } from "react";
import { ExerciseType, SwimExercise, Program } from "@prisma/client";
// utils
import { isNextDay } from "@/utils/dayjs";
// components
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import ExerciseSection from "../plans-page/ExerciseSection";
import Button from "@/components/Button";

interface HabitTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseMap: Map<ExerciseType, Array<SwimExercise>>;
  totalDistance: number;
  unit: string;
  selectedProgram: (Program & { swimExercise: SwimExercise[] }) | "" | null;
  currentRep: number;
  currActiveProgramId: string | null;
  isSelectedACompletedProgram: boolean;
  currSelectedId: string | null;
  lastCompleted: Date;
  onClickJourneyButton: () => void;
}

export default function HabitTrackingModal({
  isOpen,
  onClose,
  exerciseMap,
  totalDistance,
  unit,
  selectedProgram,
  currentRep,
  currActiveProgramId,
  isSelectedACompletedProgram,
  currSelectedId,
  lastCompleted,
  onClickJourneyButton,
}: HabitTrackingModalProps) {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                  (i + 1 <= currentRep &&
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
              selectedProgram.reps === currentRep) ||
            // or disable if the selected program is a completed program (included in the completed programs array from the DB)
            isSelectedACompletedProgram ||
            // or disable if the current active program is not the same as the
            // selected program (since we don't want the user to trigger
            // future progress from previous states e.g. (week 1 button could
            // progress week 3))
            currActiveProgramId !== (selectedProgram && selectedProgram.id) ||
            !isNextDay(lastCompleted)
          }
          className="h-16 w-full"
          onClick={onClickJourneyButton}
        >
          {!isNextDay(lastCompleted) && "Today's goal completed :)"}
          {isNextDay(lastCompleted) && // show completed if the selected program is the active program and the completed reps is the same as the goal reps
            ((currSelectedId === currActiveProgramId &&
              selectedProgram &&
              selectedProgram.reps === currentRep) ||
            // or show completed if the active program is not the same as the selected program and the selected program is a completed program
            (currActiveProgramId !== (selectedProgram && selectedProgram.id) &&
              isSelectedACompletedProgram)
              ? "Completed"
              : "I have done this today!")}
        </Button>
      </Card>
    </Modal>
  );
}
