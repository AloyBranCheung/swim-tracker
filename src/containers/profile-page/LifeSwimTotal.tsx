import React from "react";
// components
import Card from "@/components/Card";

interface LifeSwimTotalProps {
  total: number;
}

export default function LifeSwimTotal({ total }: LifeSwimTotalProps) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="space-between flex w-full items-center">
        <h1 className="w-full text-lg font-semibold text-header-font">
          Lifetime Distance Swam
        </h1>
        <h1>🏊</h1>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-semibold text-header-font">{total} m</h1>
      </div>
    </Card>
  );
}
