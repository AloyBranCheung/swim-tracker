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
      <div className="text-header-font">lifetime distance swam</div>
      <div className="text-header-font">
        activity log here: title, last swim
      </div>
      <div className="text-header-font">
        workout frequency: week calendar sunday monday tuesday etc...
      </div>
      <SignoutButton />
    </div>
  );
}
