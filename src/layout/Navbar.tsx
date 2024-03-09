import React from "react";
import Image from "next/image";
// components
import Gutter from "@/components/Gutter";

// https://cdn-icons-png.flaticon.com/512/1144/1144709.png

export default function Navbar() {
  return (
    <div>
      <Gutter>
        <div className="flex justify-between items-center p-2">
          <div>brand logo</div>
          <a href="/api/auth/logout">Logout</a>
          {/* <Image
            src="https://cdn-icons-png.flaticon.com/512/1144/1144709.png"
            alt="profile-pic.png"
            width={64}
            height={64}
          /> */}
        </div>
      </Gutter>
    </div>
  );
}
