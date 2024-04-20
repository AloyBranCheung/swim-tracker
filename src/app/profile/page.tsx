import React from "react";
import getUserAction from "@/auth/get-user-action";
import prisma from "@/libs/prisma-client";
import dayjs from "dayjs";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";
import SignoutButton from "@/components/SignoutButton";
import LifeSwimTotal from "@/containers/profile-page/LifeSwimTotal";
import { redirect } from "next/navigation";
import WorkoutsThisWeek from "@/containers/profile-page/WorkoutsThisWeek";

export default async function ProfilePage() {
  const user = await getUserAction();
  if (!user) return redirect("/");

  const currActiveJourney = await prisma.journey.findFirst({
    where: {
      isActive: true,
    },
    include: {
      swimCategory: true,
      program: true,
    },
  });

  const allSwimActivities = await prisma.userSwimActivityLog.findMany({
    where: {
      userId: user.dbUsr.id,
    },
  });

  const totalDistanceSwam = allSwimActivities.reduce(
    (acc, curr) => acc + curr.totalDistanceSwam,
    0,
  );

  const swimsThisWeek = await prisma.userSwimActivityLog.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <ProfileCard
        auth0Usr={user?.auth0Usr}
        currActiveJourney={currActiveJourney}
      />
      <LifeSwimTotal total={totalDistanceSwam} />
      <WorkoutsThisWeek swimsThisWeek={swimsThisWeek} />
      <div className="text-header-font">
        workout frequency: week calendar sunday monday tuesday etc...
      </div>
      <SignoutButton />
    </div>
  );
}
