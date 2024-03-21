import React from "react";
import { SwimExercise } from "@prisma/client";
// animations
import InteractiveCardAnimation from "@/animations/InteractiveCardAnimation";
// components
import Card from "@/components/Card";
import ArrowHeadRight from "@/components/icons/ArrowHeadRight";

interface ProgramNavigationProps {
  name: string;
  swimExercise: SwimExercise[];
}

export default function ProgramNavigation({
  name,
  swimExercise,
}: ProgramNavigationProps) {
  return (
    <InteractiveCardAnimation>
      <Card className="flex items-center justify-between">
        <h1 className="text-header-font">{name}</h1>
        <ArrowHeadRight />
      </Card>
    </InteractiveCardAnimation>
  );
}
