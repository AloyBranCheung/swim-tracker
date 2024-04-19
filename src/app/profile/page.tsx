import React from "react";
import getUserAction from "@/auth/get-user-action";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";
import SignoutButton from "@/components/SignoutButton";

export default async function ProfilePage() {
  const user = await getUserAction();
  return (
    <div className="flex flex-col gap-4">
      <ProfileCard auth0Usr={user?.auth0Usr} />
      <SignoutButton />
    </div>
  );
}
