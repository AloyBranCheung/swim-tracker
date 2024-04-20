import prisma from "@/libs/prisma-client";
import dayjs from "dayjs";
//
import getUserAction from "@/auth/get-user-action";
// components
import StatusUpdate from "../components/StatusUpdate";
import RecentFeed from "../containers/main-page/RecentFeed";
import WorkoutsThisWeek from "@/containers/profile-page/WorkoutsThisWeek";
import Page403 from "@/containers/403";
import OverviewCard from "@/containers/journey-page/OverviewCard";
import Card from "@/components/Card";
import ActivityLog from "@/components/ActivityLog";

export default async function HomePage() {
  const user = await getUserAction();
  if (!user) return <Page403 />;

  const swimsThisWeek = await prisma.userSwimActivityLog.findMany({
    where: {
      createdAt: {
        gte: dayjs().startOf("week").toDate(),
      },
    },
  });

  const currActiveJourney = await prisma.journey.findFirst({
    where: {
      isActive: true,
      userId: user.dbUsr.id,
    },
    include: {
      program: true,
      swimCategory: true,
    },
  });

  const latestActivity = await prisma.userSwimActivityLog.findFirst({
    where: {
      userId: user.dbUsr.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <StatusUpdate />
      <RecentFeed />
      <WorkoutsThisWeek swimsThisWeek={swimsThisWeek} />
      <Card className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold text-header-font">
          Current Journey Progress
        </h1>
        {currActiveJourney ? (
          <OverviewCard
            url={currActiveJourney.swimCategory.url}
            title={currActiveJourney.swimCategory.category}
            programTotal={currActiveJourney.program.reps}
            completedCount={currActiveJourney.currActiveProgramRep}
          />
        ) : (
          <p className="text-header-font">
            Go to the journey page to get started :&#41;
          </p>
        )}
      </Card>
      <Card className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold text-header-font">
          Latest Activity
        </h1>
        {latestActivity ? (
          <ActivityLog activity={latestActivity} />
        ) : (
          <p className="text-header-font">
            Completed a swim to get started :&#41;
          </p>
        )}
      </Card>
    </div>
  );
}
