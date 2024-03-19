import React from "react";
import prisma from "@/libs/prisma-client";
// components
import InfiniteFeed from "./components/InfiniteFeed";
import StatusUpdate from "@/components/StatusUpdate";

export default async function PostsPage() {
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
