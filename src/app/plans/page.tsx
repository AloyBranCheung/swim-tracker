import React from "react";
import prisma from "@/libs/prisma-client";
import SwimCategory from "@/containers/plans-page/SwimCategory";

export default async function PlansPage() {
  const swimCategories = await prisma.swimCategory.findMany({
    include: {
      programs: {
        include: {
          swimExercise: true,
        },
      },
    },
  });
  return (
    <div className="flex flex-col gap-2 text-header-font">
      {swimCategories.map((category) => (
        <SwimCategory
          key={category.id}
          categoryName={category.category}
          programs={category.programs}
        />
      ))}
    </div>
  );
}
