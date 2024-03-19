import React from "react";
import { usePathname } from "next/navigation";
// components
import Gutter from "@/components/Gutter";

// https://cdn-icons-png.flaticon.com/512/1144/1144709.png

export default function Navbar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div>
      <Gutter containerClassName="p-0">
        <div className="flex justify-between items-center p-2 bg-primary-ui w-full h-20 rounded-t-2xl bg-opacity-0 px-4">
          <div>home</div>
          <div>circle</div>
          <div>profile</div>
        </div>
      </Gutter>
    </div>
  );
}
