"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Journey, Prisma } from "@prisma/client";
// components
import Card from "@/components/Card";
import ProgramMenu from "./ProgramMenu";

export type Programs = Prisma.SwimCategoryGetPayload<{
  include: { programs: { include: { swimExercise: true } } };
}>;

interface SwimCategoryProps {
  categoryName: Programs["category"];
  programs: Programs["programs"];
  categoryDescriptions: Programs["descriptions"];
  categoryId: string;
  currActiveJourney: Journey | null;
  url: string;
  currJourney: Journey | undefined;
}

export default function SwimCategory({
  categoryName,
  categoryDescriptions,
  programs,
  categoryId,
  currActiveJourney,
  url,
  currJourney,
}: SwimCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isActiveJourney =
    currActiveJourney && currActiveJourney.swimCategoryId == categoryId;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setIsOpen(true)}
    >
      <Card
        className="flex cursor-pointer flex-col gap-2 duration-300"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        <h2 className="text-lg font-semibold text-header-font">
          {categoryName}
        </h2>

        <ul className="list-disc pl-4 text-header-font">
          {categoryDescriptions.map((description) => (
            <li key={`${description}-${Math.random()}`}>{description}</li>
          ))}
        </ul>
      </Card>
      <ProgramMenu
        isJourneyCompleted={currJourney?.isCompleted}
        isActiveJourney={isActiveJourney}
        categoryId={categoryId}
        programs={programs}
        categoryName={categoryName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </motion.div>
  );
}
