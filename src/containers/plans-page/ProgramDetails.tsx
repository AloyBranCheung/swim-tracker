import React, { useMemo } from "react";
import { SwimExercise } from "@prisma/client";
//  utils
import orderSwimExercises from "@/utils/swim-exercises";
// animations
import EnterFromRight from "@/animations/EnterFromRight";
// components
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
  const { exerciseMap, totalDistance, unit } = useMemo(
    () => orderSwimExercises(swimExercises),
    [swimExercises],
  );

  const exerciseSections = useMemo(() => {
    const sections: JSX.Element[] = [];
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
    <EnterFromRight>
      <Card className="flex flex-col gap-4">
        <BackIcon className="cursor-pointer" onClick={onClickBack} />
        <div className="flex flex-col gap-2">{exerciseSections}</div>
        <h3 className="text-lg font-semibold">
          Total: {totalDistance}
          {unit}
        </h3>
      </Card>
    </EnterFromRight>
  );
}
