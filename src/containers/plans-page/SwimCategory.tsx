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
}

export default function SwimCategory({
  programs,
  categoryName,
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
        {categoryName === ProgramLevel.BEGINNER && (
          <ul className="list-disc pl-4">
            <li>I&apos;m getting back into it</li>
            <li>I want to build some swim stamina and skills</li>
            <li>Starting from 500m</li>
          </ul>
        )}
      </Card>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {categoryName}
      </Modal>
    </motion.div>
  );
}
