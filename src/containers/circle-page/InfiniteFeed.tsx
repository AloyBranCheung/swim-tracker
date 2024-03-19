"use client";
import React, { useEffect, useState, useRef } from "react";
import { StatusPost, User } from "@prisma/client";
// actions
import { fetchPosts } from "@/actions/fetch-posts";
// components
import ReadPost from "@/components/ReadPost";
import Button from "@/components/Button";

type Post = { user: User } & StatusPost;
interface InfiniteFeedProps {
  initialPosts: Post[];
}

export default function InfiniteFeed({ initialPosts }: InfiniteFeedProps) {
  const serverInitialPosts = useRef(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [currPage, setCurrPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const fetchNextPage = async () => {
    try {
      setIsLoading(true);
      const nextPage = currPage + 1;
      const nextPosts = await fetchPosts(nextPage);
      setPosts([...posts, ...nextPosts]);
      setCurrPage(nextPage);
      setIsLoading(false);
      const nextNextPosts = await fetchPosts(nextPage + 1);
      if (nextNextPosts.length < 1) setHasNext(false);
    } catch (error) {
      console.error("Error fetching posts.");
      setIsLoading(false);
    }
  };

  const postList = posts.map((post) => (
    <ReadPost
      key={post.id}
      username={post.user.name}
      createdAt={post.createdAt}
      msg={post.msg}
    />
  ));

  useEffect(() => {
    if (initialPosts.length < 10) {
      setHasNext(false);
    }
  }, [initialPosts.length]);

  useEffect(() => {
    const isEqualArr = (arr1: Post[], arr2: Post[]) =>
      arr1.length === arr2.length &&
      arr1.every((value, index) => value.id === arr2[index].id);

    if (!isEqualArr(serverInitialPosts.current, initialPosts)) {
      // reset page if add new post
      setPosts(initialPosts);
      setHasNext(true);
      setCurrPage(0);
      serverInitialPosts.current = initialPosts;
    }
  }, [initialPosts]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">{postList}</div>
      <div className="flex w-full items-center justify-center">
        <Button
          isDisabled={!hasNext}
          isLoading={isLoading}
          onClick={() => fetchNextPage()}
        >
          {!hasNext ? "That's all folks" : "Load More"}
        </Button>
      </div>
    </div>
  );
}
