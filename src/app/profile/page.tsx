import Link from "next/link";
import React from "react";
// components
import ProfileCard from "@/containers/profile-page/ProfileCard";

export default function ProfilePage() {
  return (
    <div>
      <ProfileCard />
      <Link href="/" className="border-2 border-solid border-black">
        Back to main page
      </Link>
    </div>
  );
}
