import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// components
import OverviewCard from "@/containers/journey-page/OverviewCard";

describe("test OverviewCard Component", () => {
  it("should render correct count, total and percentage", () => {
    render(
      <OverviewCard
        url="background image url"
        title="test title"
        programTotal={10}
        completedCount={4}
      />,
    );
    expect(screen.queryByText("test title")).not.toBeNull();
    expect(screen.queryByText("4/10 swims")).not.toBeNull();
    expect(screen.queryByText("40% completion")).not.toBeNull();
  });
});
