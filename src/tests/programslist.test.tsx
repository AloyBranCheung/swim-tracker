import { vi, describe, it, expect, afterEach, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
// mocks
import mockProgramMenu from "./mocks/mockprogrammenu";
// components
import ProgramsList from "@/containers/journey-page/ProgramsList";
import HabitTrackingModal from "@/containers/journey-page/HabitTrackingModal";
import orderSwimExercises from "@/utils/swim-exercises";

const user = userEvent.setup();

describe("test ProgramsList component", () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    // @ts-expect-error - not implemented by jsdom
    window.scrollTo = vi.fn();
  });

  it("should render 3 weeks", () => {
    render(
      <ProgramsList
        programs={mockProgramMenu}
        currActiveProgramRep={1}
        currActiveProgramId={1}
        completedProgramIds={[]}
        isJourneyCompleted={false}
        timeLastCompleted={new Date()}
      />,
    );

    expect(screen.queryByText("Week 1")).not.toBeNull();
    expect(screen.queryByText("Week 2")).not.toBeNull();
    expect(screen.queryByText("Week 3")).not.toBeNull();
  });

  it("should render swim plan, show today's swim completed", async () => {
    const selectedProgram = mockProgramMenu[0];
    const currentRep = 1;
    const currentActiveProgramId = 1;
    const mockJourneyButton = vi.fn();
    const lastCompleted = new Date();

    const { exerciseMap, totalDistance, unit } = orderSwimExercises(
      selectedProgram.swimExercise,
    );

    render(
      <HabitTrackingModal
        isOpen={true}
        onClose={vi.fn()}
        exerciseMap={exerciseMap}
        totalDistance={totalDistance}
        unit={unit}
        selectedProgram={selectedProgram}
        currentRep={currentRep}
        currActiveProgramId={currentActiveProgramId}
        isSelectedACompletedProgram={false}
        currSelectedId={currentActiveProgramId}
        lastCompleted={lastCompleted}
        onClickJourneyButton={mockJourneyButton}
      />,
    );

    await user.click(screen.getByText("Today's goal completed :)"));

    expect(mockJourneyButton).not.toHaveBeenCalled();
    expect(screen.getByText("✔️")).not.toBeNull();
    expect(screen.getByText("2")).not.toBeNull();
    expect(screen.getByText("Total: 525m")).not.toBeNull();
    expect(screen.getByText("Warmup")).not.toBeNull();
  });

  it("should fire complete journey", async () => {
    const selectedProgram = mockProgramMenu[0];
    const currentRep = 1;
    const currentActiveProgramId = 1;
    const mockJourneyButton = vi.fn();
    const lastCompleted = dayjs(new Date()).subtract(1, "day").toDate();

    const { exerciseMap, totalDistance, unit } = orderSwimExercises(
      selectedProgram.swimExercise,
    );

    render(
      <HabitTrackingModal
        isOpen={true}
        onClose={vi.fn()}
        exerciseMap={exerciseMap}
        totalDistance={totalDistance}
        unit={unit}
        selectedProgram={selectedProgram}
        currentRep={currentRep}
        currActiveProgramId={currentActiveProgramId}
        isSelectedACompletedProgram={false}
        currSelectedId={currentActiveProgramId}
        lastCompleted={lastCompleted}
        onClickJourneyButton={mockJourneyButton}
      />,
    );

    await user.click(screen.getByText("I have done this today!"));

    expect(mockJourneyButton).toHaveBeenCalledOnce();
  });
});
