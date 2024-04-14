import { describe, it, vi, expect } from "vitest";
import { Prisma } from "@prisma/client";
// mocks
import getUserActionMock from "@/auth/__mocks__/get-user-action";
import prismaMock from "@/libs/__mocks__/prisma-client";
import { mockGetUserAction } from "./mocks/mockuser";
// target of test 
import progressJourney from "@/actions/progress-journey";

vi.mock("@/libs/prisma-client");
vi.mock("@/auth/get-user-action");

const date = new Date();
const mockJourneyWithRelations: Prisma.JourneyGetPayload<{ include: { program: { include: { swimExercise } }, swimCategory: true } }> = {
    completedProgramIds: [],
    createdAt: date,
    currActiveProgramId: 1,
    currActiveProgramRep: 0,
    id: 1,
    userId: 1,
    isActive: true,
    isCompleted: false,
    swimCategoryId: 1,
    timeRepLastCompleted: date,
    updatedAt: date,
    program: {
        id: 1,
        createdAt: date,
        updatedAt: date,
        name: "Week 1",
        order: 1,
        reps: 2,
        swimCategoryId: 1,
        swimExercise: [
            {
                id: 1,
                createdAt: date,
                distance: 25,
                exerciseType: "WARMUP",
                programId: 1,
                sets: 4,
                unit: 'm',
                updatedAt: date,
                accessory: null,
                notes: null,
            },
            {
                id: 2,
                createdAt: date,
                distance: 25,
                exerciseType: "MAINSET",
                programId: 1,
                sets: 4,
                unit: 'm',
                updatedAt: date,
                accessory: null,
                notes: null,
            },
            {
                id: 3,
                createdAt: date,
                distance: 25,
                exerciseType: "COOLDOWN",
                programId: 1,
                sets: 4,
                unit: 'm',
                updatedAt: date,
                accessory: null,
                notes: null,
            }
        ]
    }
}

describe("test progress journey server action", () => {
    it("should throw error if no user is found", async () => {
        getUserActionMock.mockResolvedValue(undefined)

        await expect(progressJourney()).rejects.toThrow('User not found.')
        expect.assertions(1)
    })
    it("should throw error if no active journey is found", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)

        await expect(progressJourney()).rejects.toThrow("No active journey found.")
        expect.assertions(1)
    })
    it("should not progress/make mutations when it is not the next day since timeRepLastCompleted", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValue(mockJourneyWithRelations)

        // TODO:
    })
    it("should progress to next step in program and add swim activity log", async () => {
        // TODO: 
        // getUserActionMock.mockResolvedValue(mockGetUserAction)
        // prismaMock.journey.findFirst.mockResolvedValue({
        //     completedProgramIds: [],
        //     createdAt: date,
        //     currActiveProgramId: 1,
        //     currActiveProgramRep: 0,
        //     id: 1,
        //     userId: 1,
        //     isActive: true,
        //     isCompleted: false,
        //     swimCategoryId: 1,
        //     timeRepLastCompleted: date,
        //     updatedAt: date,
        // })
    })
    it("should complete program, add to completed programs, and start next program and add swim activity log", async () => { })
    it("should complete journey and do nothing if somehow function is triggered again", async () => { })
})