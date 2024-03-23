import { ExerciseType, SwimExercise } from "@prisma/client";
import React from "react";
import { capitalize } from "lodash";
import Exercise from "./Exercise";

interface ExerciseSectionProps {
  type: ExerciseType;
  exercises: SwimExercise[];
}

export default function ExerciseSection({
  type,
  exercises,
}: ExerciseSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{capitalize(type)}</h2>
      <div className="flex flex-col gap-2">
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} swimExercise={exercise} />
        ))}
      </div>
    </div>
  );
}
