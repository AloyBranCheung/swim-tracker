import React from "react";
import getUserAction from "@/auth/get-user-action";
import prisma from "@/libs/prisma-client";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";
import SignoutButton from "@/components/SignoutButton";
import LifeSwimTotal from "@/containers/profile-page/LifeSwimTotal";
import WorkoutsThisWeek from "@/containers/profile-page/WorkoutsThisWeek";
import Activities from "@/containers/profile-page/Activities";

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
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalDistanceSwam = allSwimActivities.reduce(
    (acc, curr) => acc + curr.totalDistanceSwam,
    0,
  );

  const swimsThisWeek = await prisma.userSwimActivityLog.findMany({
    where: {
      userId: user.dbUsr.id,
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
      <Activities allSwimActivities={allSwimActivities} />
      <SignoutButton />
    </div>
  );
}
