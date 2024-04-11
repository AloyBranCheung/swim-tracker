import React from "react";
import { redirect } from "next/navigation";
// db
import prisma from "@/libs/prisma-client";
import getUserAction from "@/auth/get-user-action";
// components
import OverviewCard from "@/containers/journey-page/OverviewCard";
import StartJourney from "@/containers/journey-page/StartJourney";

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
      swimCategory: true,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {!activeJourney ? (
        <StartJourney />
      ) : (
        <>
          <OverviewCard url={activeJourney?.swimCategory.url} />
        </>
      )}
    </div>
  );
}
