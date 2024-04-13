import React from "react";

interface OverviewCardProps {
  url: string | undefined;
  title: string | undefined;
  programTotal: number | null;
  completedCount: number;
}

export default function OverviewCard({
  url,
  title,
  programTotal,
  completedCount,
}: OverviewCardProps) {
  return (
    <div
      className="flex h-24 items-center justify-between rounded-2xl p-2"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <h1 className="text-lg font-semibold text-header-font">{title}</h1>
      <div className="flex flex-col items-end gap-2">
        <p className="text-header-font">{`${completedCount}/${programTotal}`}</p>
        <p className="text-header-font">
          {programTotal && ((completedCount / programTotal) * 100).toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
