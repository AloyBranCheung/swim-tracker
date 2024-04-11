import React from "react";

interface OverviewCardProps {
  url: string | undefined;
  title: string | undefined;
  programTotal: number | null;
}

export default function OverviewCard({
  url,
  title,
  programTotal,
}: OverviewCardProps) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl p-2"
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <h1 className="text-lg font-semibold text-header-font">{title}</h1>
      <div className="flex flex-col items-end gap-2">
        <p className="text-header-font">{`completed/${programTotal}`}</p>
        <p className="text-header-font">completed%</p>
      </div>
    </div>
  );
}
