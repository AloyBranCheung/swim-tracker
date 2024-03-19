import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// config
import { NAVBAR_CONFIG } from "./config";
// components
import NavbarIconContainer from "./NavbarIconContainer";

// https://cdn-icons-png.flaticon.com/512/1144/1144709.png

export default function Navbar() {
  const pathname = usePathname();

  const FOCUSED_BORDER = "border-b-2 border-solid border-secondary";

  const navbar = NAVBAR_CONFIG.map((item, index) => (
    <Link key={`${item.title}-${index}`} href={item.path}>
      <NavbarIconContainer
        className={pathname === item.path ? FOCUSED_BORDER : ""}
      >
        {item.icon}
        <p className="text-xs text-header-font">{item.title}</p>
      </NavbarIconContainer>
    </Link>
  ));

  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex h-20 w-full items-center justify-center rounded-t-2xl bg-primary-ui bg-opacity-0 px-8 py-4">
        <div className="flex h-full w-full items-center justify-between">
          {navbar}
        </div>
      </div>
    </div>
  );
}
