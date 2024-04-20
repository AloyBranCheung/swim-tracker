import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// mocks
import mockSwimActivity from "./mocks/mockswimactivity";
// test this
import WorkoutsThisWeek from "@/containers/profile-page/WorkoutsThisWeek";

describe("test WorkoutsThisWeek component", () => {
  it("should not show any 🏊‍♀️ emoji", () => {
    render(<WorkoutsThisWeek swimsThisWeek={[]} />);

    expect(screen.queryByText("🏊‍♀️")).toBeNull();
  });

  it("should show two 🏊‍♀️ emoji", () => {
    render(<WorkoutsThisWeek swimsThisWeek={mockSwimActivity} />);

    expect(screen.queryAllByText("🏊‍♀️").length).toBe(2);
  });
});
