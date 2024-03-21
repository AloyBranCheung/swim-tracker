import React from "react";
import prisma from "@/libs/prisma-client";
// auth
import getUserAction from "@/auth/get-user-action";
// components
import InfiniteFeed from "../../containers/circle-page/InfiniteFeed";
import StatusUpdate from "@/components/StatusUpdate";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  const usrDetails = await getUserAction();

  if (!usrDetails) {
    return redirect("/");
  }

  const initialPosts = await prisma.statusPost.findMany({
    include: {
      user: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <StatusUpdate />
      <InfiniteFeed initialPosts={initialPosts} />
    </div>
  );
}
