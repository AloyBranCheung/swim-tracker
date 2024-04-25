// there is currently a bug with next14 app router
// https://dev.to/joseph42a/nextjs-page-transition-with-framer-motion-33dg
// https://stackoverflow.com/questions/77603249/how-to-make-a-page-transition-with-framer-motion-and-next-js-14
import React from "react";
import PageTransition from "@/animations/PageTransition";

interface RootTemplateProps {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: RootTemplateProps) {
  return <PageTransition>{children}</PageTransition>;
}
