import React from "react";

interface OverviewCardProps {
  url: string | null | undefined;
}

export default function OverviewCard({ url }: OverviewCardProps) {
  console.log(url);
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      OverviewCard
    </div>
  );
}
