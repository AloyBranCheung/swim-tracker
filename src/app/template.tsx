import React from "react";
import PageTransition from "@/animations/PageTransition";

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
