import React from "react";
import dayjs from "dayjs";
import classNames from "classnames";
// components
import Card from "@/components/Card";
import { UserSwimActivityLog } from "@prisma/client";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

interface WorkoutsThisWeekProps {
  swimsThisWeek: UserSwimActivityLog[];
}

export default function WorkoutsThisWeek({
  swimsThisWeek,
}: WorkoutsThisWeekProps) {
  return (
    <Card className="text-header-font">
      <h1 className="text-lg font-semibold text-header-font">
        Swims this week
      </h1>
      <div className="space-between flex h-full max-w-full items-start gap-2 overflow-auto">
        {daysOfWeek.map((day, i) => {
          const dayOfWeek = dayjs().day(i);
          const isToday = dayjs().isSame(dayOfWeek, "day");

          return (
            <div
              key={`${day}-${i}`}
              className="space-between flex flex-col items-center justify-center"
            >
              <Card
                className={classNames(
                  "flex flex-col items-center justify-center",
                  {
                    "bg-secondary-ui": isToday, // if is today
                  },
                )}
              >
                <h2
                  className={classNames({
                    "text-black": isToday, // if is today
                  })}
                >
                  {day}
                </h2>
                <div
                  className={classNames({
                    "text-black": isToday, // if is today
                  })}
                >
                  {dayOfWeek.format("D")}
                </div>
              </Card>
              {
                // if worked out on this day
                swimsThisWeek.some((ele) =>
                  dayOfWeek.isSame(ele.createdAt, "day"),
                ) && <div>🏊‍♀️</div>
              }
            </div>
          );
        })}
      </div>
    </Card>
  );
}
