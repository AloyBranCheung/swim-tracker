import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// components
import InfiniteFeed, { Post } from "@/containers/circle-page/InfiniteFeed";

const MOCK_POSTS: (postNumber?: number) => Post[] = (postNumber = 4) =>
  new Array(postNumber).fill(0).map((_, index) => ({
    user: {
      id: index,
      auth0Id: `auth0id|${index}`,
      createdAt: new Date(),
      email: `email${index}@test.com`,
      name: `user.name ${index}`,
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    id: index,
    msg: `test ${index}`,
    updatedAt: new Date(0),
    userId: index,
  }));

describe("test infinite feed component", () => {
  it("should render posts", async () => {
    render(<InfiniteFeed initialPosts={MOCK_POSTS()} />);

    expect(screen.queryByText("test 1")).toBeDefined();
    expect(screen.queryAllByText("That's all folks")).toBeDefined();
    expect(screen.queryByText("Load More")).toBeNull();
  });

  it("should show load more button", async () => {
    render(<InfiniteFeed initialPosts={MOCK_POSTS(10)} />);

    expect(screen.queryAllByText("test 1")).toBeDefined();
    expect(screen.queryAllByText("user.name 1")).toBeDefined();
    expect(screen.queryAllByText("Load More")).toBeDefined();
  });
});
