import React from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
// types
import { Auth0UserDetails } from "@/types/user";
// components
import Card from "@/components/Card";

interface ProfileCardProps {
  auth0Usr: Auth0UserDetails | undefined;
  currActiveJourney: Prisma.JourneyGetPayload<{
    include: {
      swimCategory: true;
      program: true;
    };
  }> | null;
}

export default function ProfileCard({
  auth0Usr,
  currActiveJourney,
}: ProfileCardProps) {
  const swimsLeft = currActiveJourney
    ? currActiveJourney.program.reps - currActiveJourney.currActiveProgramRep
    : 0;

  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-full w-full flex-col gap-2">
        <h2 className="w-full text-base font-semibold text-header-font">
          Hello, {auth0Usr?.name ?? "Err: Not found."}
        </h2>
        <p className="w-full text-xs text-header-font">
          {!currActiveJourney && "Head to the Journey page to get swimming :)"}
          {currActiveJourney &&
            `You have ${swimsLeft} swim${swimsLeft > 1 ? "s" : ""} in ${currActiveJourney.program.name} ${currActiveJourney.swimCategory.category} journey.`}
        </p>
      </div>
      <div className="w-fit overflow-hidden rounded-full">
        <Image
          src={auth0Usr?.image ?? ""}
          alt="profile-picture"
          width={75}
          height={75}
        />
      </div>
    </Card>
  );
}
