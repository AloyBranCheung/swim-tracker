import { expect, describe, it, beforeAll, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// mocks
import MOCK_PROGRAM_MENU from "./mocks/mockprogrammenu";
// components
import ProgramMenu from "@/containers/plans-page/ProgramMenu";
import { Programs } from "@/containers/plans-page/SwimCategory";

const user = userEvent.setup();

describe("test ProgramMenu component", () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3294 not implemented by jsdom
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render programs", () => {
    render(
      <ProgramMenu
        programs={MOCK_PROGRAM_MENU as unknown as Programs["programs"]}
        categoryName={"BEGINNER"}
        isOpen
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("BEGINNER")).toBeDefined();
    expect(screen.getByText("Week 1")).toBeDefined();
    expect(screen.getByText("Start Journey")).toBeDefined();
  });

  it("should navigate to week 1 programs", async () => {
    render(
      <ProgramMenu
        programs={MOCK_PROGRAM_MENU as unknown as Programs["programs"]}
        categoryName={"BEGINNER"}
        isOpen
        onClose={() => {}}
      />,
    );

    await user.click(screen.getByText("Week 1"));

    expect(screen.getByText("Warmup")).toBeDefined();
    expect(screen.getByText("Total: 525m")).toBeDefined();
  });

  it("should go back to main menu", async () => {
    render(
      <ProgramMenu
        programs={MOCK_PROGRAM_MENU as unknown as Programs["programs"]}
        categoryName={"BEGINNER"}
        isOpen
        onClose={() => {}}
      />,
    );

    await user.click(screen.getByText("Week 1"));
    expect(screen.getByText("Warmup")).toBeDefined();
    expect(screen.getByText("Total: 525m")).toBeDefined();

    await user.click(screen.getByAltText("back icon"));

    expect(screen.getByText("BEGINNER")).toBeDefined();
    expect(screen.getByText("Week 1")).toBeDefined();
    expect(screen.getByText("Start Journey")).toBeDefined();
  });
});
