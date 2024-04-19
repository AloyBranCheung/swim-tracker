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
    <Card className="flex gap-6">
      <div className="w-fit overflow-hidden rounded-full">
        <Image
          src={auth0Usr?.image ?? ""}
          alt="profile-picture"
          width={75}
          height={75}
        />
      </div>
      <div className="h-full w-full">
        <h2 className="font-semibold text-header-font">
          {auth0Usr?.name ?? "Err: Not found."}
        </h2>
      </div>
    </Card>
  );
}
