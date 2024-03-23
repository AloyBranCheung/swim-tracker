import React, { useMemo } from "react";
// animations
import EnterFromRight from "@/animations/EnterFromRight";
import { ExerciseType, SwimExercise } from "@prisma/client";
import BackIcon from "@/components/icons/BackIcon";
import Card from "@/components/Card";
import ExerciseSection from "./ExerciseSection";

interface ProgramDetailsProps {
  swimExercises: SwimExercise[];
  onClickBack: () => void;
}

export default function ProgramDetails({
  swimExercises,
  onClickBack,
}: ProgramDetailsProps) {
  const { exercises, totalDistance, unit } = useMemo(() => {
    let totalDistance = 0;
    let unit: string = "";
    const exercises: { [key in ExerciseType]: SwimExercise[] } = {
      [ExerciseType.WARMUP]: [],
      [ExerciseType.MAINSET]: [],
      [ExerciseType.COOLDOWN]: [],
    };
    for (const exercise of swimExercises) {
      unit = exercise.unit;
      totalDistance += exercise.distance * exercise.sets;
      exercises[exercise.exerciseType].push(exercise);
    }
    return { exercises, totalDistance, unit };
  }, [swimExercises]);

  return (
    <EnterFromRight>
      <Card className="flex flex-col gap-4">
        <BackIcon className="cursor-pointer" onClick={onClickBack} />
        <div className="flex flex-col gap-2">
          {Object.entries(exercises).map(([type, exercises]) => (
            <ExerciseSection
              key={type}
              type={type as ExerciseType}
              exercises={exercises}
            />
          ))}
        </div>
        <h3 className="text-lg font-semibold">
          Total: {totalDistance}
          {unit}
        </h3>
      </Card>
    </EnterFromRight>
  );
}
