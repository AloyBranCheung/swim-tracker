"use client";
import React from "react";
import Card from "./Card";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

interface ActivityLogProps {
  activity: Prisma.UserSwimActivityLogGetPayload<true>;
}

export default function ActivityLog({ activity }: ActivityLogProps) {
  return (
    <Card className="flex flex-col gap-2">
      <h3 className="font-semibold text-header-font" suppressHydrationWarning>
        {dayjs(activity.createdAt).format("YYYY-MM-DD hh:mma")}
      </h3>
      <p className="text-header-font">
        Distance Swam: {activity.totalDistanceSwam}
        {activity.unit}
      </p>
    </Card>
  );
}
