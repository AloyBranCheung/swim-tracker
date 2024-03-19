"use client";
import React, { useEffect, useState } from "react";
import { StatusPost, User } from "@prisma/client";
// components
import ReadPost from "@/components/ReadPost";

interface InfiniteFeedProps {
  initialPosts: ({ user: User } & StatusPost)[];
}

export default function InfiniteFeed({ initialPosts }: InfiniteFeedProps) {
  const [posts, setPosts] = useState(initialPosts);

  const postList = posts.map((post) => (
    <ReadPost
      key={post.id}
      username={post.user.name}
      createdAt={post.createdAt}
      msg={post.msg}
    />
  ));

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  return (
    <div>
      <div className="flex flex-col gap-2">{postList}</div>
    </div>
  );
}
