import Link from "next/link";
import React from "react";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";
import SignoutButton from "@/components/SignoutButton";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-2">
      <ProfileCard />
      <SignoutButton />
    </div>
  );
}
