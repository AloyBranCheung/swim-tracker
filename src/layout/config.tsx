import React from "react";
// components
import HomeIcon from "@/components/icons/HomeIcon";
import PeopleIcon from "@/components/icons/PeopleIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import PlanIcon from "@/components/icons/PlanIcon";
import JourneyIcon from "@/components/icons/JourneyIcon";

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
    title: "Journey",
    icon: <JourneyIcon />,
    path: "/journey",
  },
  {
    title: "Circle",
    icon: <PeopleIcon />,
    path: "/circle",
  },
  {
    title: "Swim Plans",
    icon: <PlanIcon />,
    path: "/plans",
  },
  {
    title: "Me",
    icon: <ProfileIcon />,
    path: "/profile",
  },
];
