import React from "react";
// animations
import EnterFromRight from "@/animations/EnterFromRight";
import { SwimExercise } from "@prisma/client";
import BackIcon from "@/components/icons/BackIcon";
import Button from "@/components/Button";

interface ProgramDetailsProps {
  swimExercises: SwimExercise[];
  onClickBack: () => void;
}

export default function ProgramDetails({
  swimExercises,
  onClickBack,
}: ProgramDetailsProps) {
  console.log({ swimExercises });
  return (
    <EnterFromRight>
      <Button onClick={onClickBack}>
        <BackIcon />
      </Button>
      <div>helloworld</div>
    </EnterFromRight>
  );
}
