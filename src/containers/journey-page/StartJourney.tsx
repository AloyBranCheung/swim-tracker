"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// components
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function StartJourney() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="flex flex-col items-center gap-2">
      <p className="text-center text-lg font-semibold text-header-font">
        Start your journey now
      </p>
      <Button
        isDisabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          router.push("/plans");
        }}
      >
        {!isLoading ? "Let's go" : "Loading..."}
      </Button>
    </Card>
  );
}
