import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
// mocks
import mockSwimActivity from "./mocks/mockswimactivity";
// test this
import WorkoutsThisWeek from "@/containers/profile-page/WorkoutsThisWeek";

describe("test WorkoutsThisWeek component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not show any 🏊‍♀️ emoji", () => {
    render(<WorkoutsThisWeek swimsThisWeek={[]} />);

    expect(screen.queryByText("🏊‍♀️")).toBeNull();
  });

  it("should show two 🏊‍♀️ emoji", () => {
    vi.setSystemTime(new Date("2024-03-20"));

    render(<WorkoutsThisWeek swimsThisWeek={mockSwimActivity} />);
    expect(screen.queryAllByText("🏊‍♀️").length).toBe(2);
  });
});
