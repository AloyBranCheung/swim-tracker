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
      <a
        href="/api/auth/signout"
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer rounded-2xl bg-loading-gradient p-2 px-16 font-bold text-white shadow-2xl hover:bg-primary-ui hover:text-gray-400 hover:transition-all"
      >
        tmp signout btn
      </a>
    </div>
  );
}
