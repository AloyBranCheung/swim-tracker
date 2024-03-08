import Link from "next/link";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <p>ProfilePage</p>
      <Link href="/" className="border-2 border-solid border-black">
        Back to main page
      </Link>
    </div>
  );
}
