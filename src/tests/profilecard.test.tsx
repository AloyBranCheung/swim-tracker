import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
// mocks
import mockSession from "./mocks/mocksession";
import mockCurrJourneyResponse from "./mocks/mockcurrjourneyresponse";
// test this
import ProfileCard from "@/containers/profile-page/ProfileCard";

vi.mock("next/image");

describe("test ProfileCard component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render no active journey text", () => {
    render(
      <ProfileCard auth0Usr={mockSession.user} currActiveJourney={null} />,
    );

    expect(
      screen.queryByText("Head to the Journey page to get swimming :)"),
    ).not.toBeNull();
    expect(screen.queryByText("Hello, Test User")).not.toBeNull();
  });

  it("should render active journey text", () => {
    render(
      <ProfileCard
        auth0Usr={mockSession.user}
        currActiveJourney={mockCurrJourneyResponse}
      />,
    );

    expect(
      screen.queryByText("You have 2 swims in Week 1 BEGINNER journey."),
    ).not.toBeNull();
    expect(screen.queryByText("Hello, Test User")).not.toBeNull();
  });
});
