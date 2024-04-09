"use client";
import React from "react";
import Card from "./Card";
import { dateFormatter } from "@/utils/dayjs";

interface ReadPostProps {
  username: string | null;
  createdAt: Date;
  msg: string;
}

export default function ReadPost({ username, createdAt, msg }: ReadPostProps) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <p className="font-medium text-header-font">
          {username || "Err: No username found."}
        </p>
        {/* {warning suppressed as time is converted to local browser time from utc 0 server} */}
        <p className="font-medium text-header-font" suppressHydrationWarning>
          {dateFormatter(createdAt)}
        </p>
      </div>
      <p className="break-words text-primary-font">{msg}</p>
    </Card>
  );
}
