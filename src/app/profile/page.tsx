import React from "react";
import getUserAction from "@/auth/get-user-action";
import prisma from "@/libs/prisma-client";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";
import SignoutButton from "@/components/SignoutButton";

export default async function ProfilePage() {
  const user = await getUserAction();

  const currActiveJourney = await prisma.journey.findFirst({
    where: {
      isActive: true,
    },
    include: {
      swimCategory: true,
      program: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <ProfileCard
        auth0Usr={user?.auth0Usr}
        currActiveJourney={currActiveJourney}
      />
      <div className="text-header-font">lifetime distance swam</div>
      <div className="text-header-font">
        activity log here: title, last swim
      </div>
      <div className="text-header-font">
        workout frequency: week calendar sunday monday tuesday etc...
      </div>
      <SignoutButton />
    </div>
  );
}
