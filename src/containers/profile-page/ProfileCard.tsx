import React from "react";
import Image from "next/image";
// types
import { Auth0UserDetails } from "@/types/user";
// components
import Card from "@/components/Card";

interface ProfileCardProps {
  auth0Usr: Auth0UserDetails | undefined;
}

export default function ProfileCard({ auth0Usr }: ProfileCardProps) {
  return (
    <Card className="flex items-center gap-6">
      <div className="flex h-full w-full flex-col gap-2">
        <h2 className="text-sm font-semibold text-header-font">
          Hello, {auth0Usr?.name ?? "Err: Not found."}
        </h2>
        <p className="text-xs text-header-font">
          You have x swims left in xWeek yx of your xIntermediatex Journey
        </p>
      </div>
      <div className="w-fit overflow-hidden rounded-full">
        <Image
          src={auth0Usr?.image ?? ""}
          alt="profile-picture"
          width={75}
          height={75}
        />
      </div>
    </Card>
  );
}
