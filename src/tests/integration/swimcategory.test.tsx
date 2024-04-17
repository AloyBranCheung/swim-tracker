import { describe, vi, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import prisma from "../utils/prisma";
// test this
import SwimCategory from "@/containers/plans-page/SwimCategory";
import { afterEach } from "node:test";

const user = userEvent.setup();

type JourneyWithInclude = Prisma.JourneyGetPayload<{
  include: {
    swimCategory: {
      include: {
        programs: {
          include: {
            swimExercise: true;
          };
        };
      };
    };
  };
}>;

describe("test ProgramMenu component", () => {
  let inactiveAndIncompleteJourney: JourneyWithInclude;
  let activeAndCompletedJourney: JourneyWithInclude;

  beforeEach(async () => {
    // https://github.com/jsdom/jsdom/issues/3294
    // not implemented by jsdom
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    // @ts-expect-error - not implemented by jsdom
    window.scrollTo = vi.fn();

    const testUser = await prisma.user.findFirst(); // only one test user
    if (!testUser) throw new Error("User not found, test db setup err?");
    // inactive
    const beginnerCategory = await prisma.swimCategory.findFirst({
      where: {
        category: "BEGINNER",
      },
      include: {
        programs: true,
      },
    });

    // active
    const intermediateCategory = await prisma.swimCategory.findFirst({
      where: {
        category: "INTERMEDIATE",
      },
      include: {
        programs: true,
      },
    });
    if (!beginnerCategory || !intermediateCategory)
      throw new Error("SwimCategories not found, test db setup err?");

    inactiveAndIncompleteJourney = await prisma.journey.create({
      data: {
        isActive: false,
        isCompleted: false,
        swimCategoryId: beginnerCategory.id,
        currActiveProgramId: beginnerCategory.programs[0].id,
        userId: testUser.id,
        timeRepLastCompleted: dayjs(new Date()).subtract(2, "day").toDate(),
      },
      include: {
        swimCategory: {
          include: {
            programs: {
              include: {
                swimExercise: true,
              },
            },
          },
        },
      },
    });

    activeAndCompletedJourney = await prisma.journey.create({
      data: {
        isActive: true,
        isCompleted: true,
        swimCategoryId: intermediateCategory.id,
        currActiveProgramId: intermediateCategory.programs[0].id,
        userId: testUser.id,
        timeRepLastCompleted: dayjs(new Date()).subtract(2, "day").toDate(),
      },
      include: {
        swimCategory: {
          include: {
            programs: {
              include: {
                swimExercise: true,
              },
            },
          },
        },
      },
    });
  });

  afterEach(() => {
    cleanup(); // remove duplicate renders
  });

  it("should show start journey text in an inactive journey when another journey is completed and active", async () => {
    render(
      <SwimCategory
        categoryName={inactiveAndIncompleteJourney.swimCategory.category}
        programs={inactiveAndIncompleteJourney.swimCategory.programs}
        categoryDescriptions={
          inactiveAndIncompleteJourney.swimCategory.descriptions
        }
        categoryId={inactiveAndIncompleteJourney.swimCategoryId}
        currActiveJourney={activeAndCompletedJourney}
        url="testimageurl"
        currJourney={inactiveAndIncompleteJourney}
      />,
    );

    await user.click(screen.getByText("BEGINNER"));

    expect(screen.queryByText("Start Journey")).not.toBeNull();
    expect(screen.queryByText("Week 3")).not.toBeNull();
    expect(screen.queryByText("applause")).toBeNull();
  });
});
