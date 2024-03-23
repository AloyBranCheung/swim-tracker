import React from "react";
// animations
import InteractiveCardAnimation from "@/animations/InteractiveCardAnimation";
import ExitLeft from "@/animations/ExitLeft";
// components
import Card from "@/components/Card";
import ArrowHeadRight from "@/components/icons/ArrowHeadRight";

interface ProgramItemNavigationProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ProgramItemNavigation({
  name,
  isSelected,
  onClick,
}: ProgramItemNavigationProps) {
  return (
    <ExitLeft initial={true}>
      {!isSelected && (
        <InteractiveCardAnimation>
          <Card className="flex items-center justify-between" onClick={onClick}>
            <h1 className="text-header-font">{name}</h1>
            <ArrowHeadRight />
          </Card>
        </InteractiveCardAnimation>
      )}
    </ExitLeft>
  );
}
