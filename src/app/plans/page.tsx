import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma-client";
import getUserAction from "@/auth/get-user-action";
import SwimCategory from "@/containers/plans-page/SwimCategory";

export default async function PlansPage() {
  const userDetails = await getUserAction();

  if (!userDetails) {
    return redirect("/api/auth/login");
  }

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
          categoryDescriptions={category.descriptions}
        />
      ))}
    </div>
  );
}
