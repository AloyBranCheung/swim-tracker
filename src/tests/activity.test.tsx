import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
// mocks
import mockSwimActivity from "./mocks/mockswimactivity";
// test this
import Activities from "@/containers/profile-page/Activities";

describe("test Activities component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render activities", () => {
    render(<Activities allSwimActivities={mockSwimActivity} />);

    expect(screen.queryAllByText("Distance Swam: 750m")).not.toBeNull();
    expect(screen.queryAllByText("Distance Swam: 750m").length).toBe(2);
  });

  it("should not render activites", () => {
    render(<Activities allSwimActivities={[]} />);

    expect(screen.queryByText("Distance Swam: 750m")).toBeNull();
    expect(screen.queryByText("Start swimming :)")).not.toBeNull();
  });
});
