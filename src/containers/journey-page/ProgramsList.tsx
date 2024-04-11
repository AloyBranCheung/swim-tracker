import React from "react";
// components
import Card from "@/components/Card";
import { Program } from "@prisma/client";

interface ProgramsListProps {
  programs: Program[] | null;
}

export default function ProgramsList({ programs }: ProgramsListProps) {
  const menuItems = programs
    ? programs.map((program) => (
        <Card key={program.id}>
          <p className="font-semibold text-header-font">{program.name}</p>
        </Card>
      ))
    : [];

  // TODO: modal for 'done'

  return <Card className="flex flex-col gap-2">{menuItems}</Card>;
}
