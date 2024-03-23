import { SwimExercise } from "@prisma/client";
import React from "react";

interface ExerciseProps {
  swimExercise: SwimExercise;
}

export default function Exercise({ swimExercise }: ExerciseProps) {
  return (
    <div>
      <h3 className="text-lg font-medium">
        {swimExercise.sets} x {swimExercise.distance}
      </h3>
      <p className="text-sm">
        {swimExercise.accessory &&
          `Accessories: ${swimExercise.accessory.toLowerCase()}`}
      </p>
      <p className="text-sm">
        {swimExercise.notes && `Notes: ${swimExercise.notes}`}
      </p>
    </div>
  );
}
