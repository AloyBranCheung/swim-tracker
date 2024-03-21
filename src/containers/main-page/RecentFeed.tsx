import React from "react";
import prisma from "@/libs/prisma-client";
import Link from "next/link";
// auth
import getUserAction from "@/auth/get-user-action";
// components
import CardContainer from "../../components/CardContainer";
import ReadPost from "@/components/ReadPost";
import { redirect } from "next/navigation";

// last 3 posts
export default async function RecentFeed() {
  const usrDetails = await getUserAction();
  if (!usrDetails) {
    return redirect("/");
  }

  const latestPosts = await prisma.statusPost.findMany({
    include: {
      user: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <CardContainer className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-header-font text-opacity-80">
        Latest Posts
      </h2>
      <div className="flex flex-col gap-2">
        {latestPosts.length > 0 ? (
          latestPosts.map(({ id, user, msg, createdAt }) => (
            <ReadPost
              key={id}
              username={user.name}
              msg={msg}
              createdAt={createdAt}
            />
          ))
        ) : (
          <p className="self-center text-secondary-font">
            Say something witty to get started :&#41;
          </p>
        )}
      </div>
      <Link
        className="self-end text-sm font-medium text-header-font"
        href="/circle"
      >
        See more
      </Link>
    </CardContainer>
  );
}
