"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Prisma, ProgramLevel } from "@prisma/client";
// components
import Card from "@/components/Card";
import Modal from "@/components/Modal";

type Programs = Prisma.SwimCategoryGetPayload<{
  include: { programs: { include: { swimExercise: true } } };
}>;

interface SwimCategoryProps {
  categoryName: Programs["category"];
  programs: Programs["programs"];
  categoryDescriptions: Programs["descriptions"];
}

export default function SwimCategory({
  programs,
  categoryName,
  categoryDescriptions,
}: SwimCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setIsOpen(true)}
    >
      <Card
        className={`flex cursor-pointer flex-col gap-2 duration-300 ${categoryName === ProgramLevel.BEGINNER && "bg-beginner-swim"} ${categoryName === ProgramLevel.INTERMEDIATE && "bg-intermediate-swim"} ${categoryName === ProgramLevel.ADVANCED && "bg-advanced-swim"}`}
      >
        <h2 className="text-2xl">{categoryName}</h2>

        <ul className="list-disc pl-4">
          {categoryDescriptions.map((description) => (
            <li key={`${description}-${Math.random()}`}>{description}</li>
          ))}
        </ul>
      </Card>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {categoryName}
      </Modal>
    </motion.div>
  );
}
