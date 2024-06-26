"use client";
import React from "react";
// components
import Card from "@/components/Card";
import { UserSwimActivityLog } from "@prisma/client";
import ActivityLog from "@/components/ActivityLog";

interface ActivitiesProps {
  allSwimActivities: UserSwimActivityLog[];
}

export default function Activities({ allSwimActivities }: ActivitiesProps) {
  return (
    <Card className="flex flex-col gap-4 text-header-font">
      <h1 className="text-lg font-semibold text-header-font">
        Your Swim Activity
      </h1>
      <div className="flex max-h-[300px] flex-col gap-2 overflow-auto">
        {allSwimActivities.length > 0 ? (
          allSwimActivities.map((activity) => (
            <ActivityLog key={activity.id} activity={activity} />
          ))
        ) : (
          <p>Start swimming :&#41;</p>
        )}
      </div>
    </Card>
  );
}
