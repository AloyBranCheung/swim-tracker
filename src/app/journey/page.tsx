import React from "react";
import { redirect } from "next/navigation";
// db
import prisma from "@/libs/prisma-client";
import getUserAction from "@/auth/get-user-action";
// components
import OverviewCard from "@/containers/journey-page/OverviewCard";
import StartJourney from "@/containers/journey-page/StartJourney";
import ProgramsList from "@/containers/journey-page/ProgramsList";

export default async function JourneyPage() {
  const userDetails = await getUserAction();

  if (!userDetails) {
    redirect("/");
  }

  const activeJourney = await prisma.journey.findFirst({
    where: {
      userId: userDetails.dbUsr.id,
      isActive: true,
    },
    include: {
      swimCategory: {
        include: {
          programs: {
            include: {
              swimExercise: true,
            },
          },
        },
      },
    },
  });

  const programTotal = (() => {
    let total = 0;

    if (!activeJourney) return 0;
    for (const program of activeJourney.swimCategory.programs) {
      total += program.reps;
    }

    return total;
  })();

  const currActiveProgramRep = activeJourney?.currActiveProgramRep || 0;

  const completedCount = await (async () => {
    let total = 0;

    if (!activeJourney) return 0;

    /*   
    shallow clone as arrays are reference types but will not work for nested
    arrays (references type) learning!
    https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
    https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types

    Spread Operator: The spread operator (...) is a convenient way to create a
    shallow copy of an array. It's simple and easy to use, but it only creates a
    shallow copy. This means that if your array contains objects or other
    arrays, the new array will reference the same objects or arrays, not copies
    of them. For an array of numbers, the spread operator is perfectly suitable
    and efficient.

    structuredClone: This method is used for deep copying, meaning it creates a
    new copy of the array and all objects or arrays it contains. It's more
    robust and can handle complex data structures, but it's also more
    resource-intensive than the spread operator. For an array of numbers, using
    structuredClone would be overkill and less efficient than the spread
    operator.

    i didn't need to do it since i don't mutate the array but just a learning
    opportunity
    */
    const completedIdsArr = [...activeJourney.completedProgramIds];

    const completedPrograms = await prisma.program.findMany({
      where: {
        id: {
          in: completedIdsArr,
        },
      },
    });

    if (!completedPrograms) return 0;

    for (const program of completedPrograms) {
      total += program.reps;
    }

    if (
      activeJourney.completedProgramIds.includes(
        activeJourney.currActiveProgramId,
      )
    ) {
      return total;
    }

    total += activeJourney.currActiveProgramRep;

    return total;
  })();

  return (
    <div className="flex flex-col gap-2">
      {!activeJourney ? (
        <StartJourney />
      ) : (
        <>
          <OverviewCard
            title={activeJourney?.swimCategory.category}
            url={activeJourney?.swimCategory.url}
            programTotal={programTotal}
            completedCount={completedCount}
          />
          <ProgramsList
            programs={activeJourney?.swimCategory.programs}
            currActiveProgramRep={currActiveProgramRep}
            currActiveProgramId={activeJourney?.currActiveProgramId}
            completedProgramIds={activeJourney?.completedProgramIds}
          />
        </>
      )}
    </div>
  );
}
