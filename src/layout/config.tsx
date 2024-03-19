import React from "react";
import HomeIcon from "@/components/icons/HomeIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";

interface NavbarConfig {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export const NAVBAR_CONFIG: NavbarConfig[] = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Circle",
    icon: <PeopleIcon />,
    path: "/circle",
  },
  {
    title: "Me",
    icon: <ProfileIcon />,
    path: "/profile",
  },
];
