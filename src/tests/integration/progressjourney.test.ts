import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import prisma from "../utils/prisma";
import dayjs from "dayjs";
import { User, Prisma } from "@prisma/client";
// mocks
import mockGetUserAction from '@/auth/__mocks__/get-user-action'
// test this function
import progressJourney from "@/actions/progress-journey";
import mockUser from "../mocks/mockuser";
import { mockClear } from "vitest-mock-extended";

vi.mock('@/auth/get-user-action')
vi.mock('next/cache')

describe("test progress journey server action interaction with db", () => {
    let mockNextCache: typeof import('next/cache');
    let dbUsr: User | null;
    let programId: string | undefined;
    let swimCategory: Prisma.SwimCategoryGetPayload<{
        include: {
            programs: true
        }
    }> | null;

    beforeEach(async () => {
        mockNextCache = await import('next/cache')
        mockNextCache.revalidatePath = vi.fn()

        // get user
        dbUsr = await prisma.user.findFirst({
            where: {
                email: mockUser.email
            }
        })
        if (!dbUsr) throw new Error("User not found in db. Test setup error?")

        swimCategory = await prisma.swimCategory.findFirst({
            where: {
                category: 'BEGINNER'
            },
            include: {
                programs: {
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        })
        if (!swimCategory) throw new Error("Swim category not found in db. Test setup error?")

        programId = swimCategory.programs.find((p) => p.name === 'Week 1')?.id

        if (!programId) throw new Error("Program not found in db. Test setup error?")

        mockGetUserAction.mockResolvedValue({
            dbUsr,
            auth0User: {
                email: mockUser.email
            }
        })


    })

    afterEach(() => {
        mockClear(mockNextCache.revalidatePath)
    })

    it("should progress journey program by 1 step", async () => {
        if (!swimCategory) throw new Error("Swim category not found in db. Test setup error?")
        if (!dbUsr) throw new Error("User not found in db. Test setup error?")
        if (!programId) throw new Error("Program not found in db. Test setup error?")

        // set up active journey
        await prisma.journey.create({
            data: {
                isActive: true,
                timeRepLastCompleted: dayjs(new Date).subtract(7, 'day').toDate(),
                completedProgramIds: [],
                currActiveProgramId: programId,
                swimCategoryId: swimCategory.id,
                userId: dbUsr.id,
                currActiveProgramRep: 0,
                isCompleted: false,
            }
        })


        await expect(progressJourney()).resolves.toBeUndefined()

        const journey = await prisma.journey.findMany()

        expect(journey).toHaveLength(1)
        expect(journey[0].currActiveProgramRep).toBe(1)

        const activities = await prisma.userSwimActivityLog.findMany();

        expect(activities).toHaveLength(1)
        expect.assertions(4)
    })

    it("should complete program and start next journey program", async () => {
        if (!swimCategory) throw new Error("Swim category not found in db. Test setup error?")
        if (!dbUsr) throw new Error("User not found in db. Test setup error?")
        if (!programId) throw new Error("Program not found in db. Test setup error?")

        // set up active journey
        const mockCreatedJourney = await prisma.journey.create({
            data: {
                isActive: true,
                timeRepLastCompleted: dayjs(new Date).subtract(7, 'day').toDate(),
                completedProgramIds: [],
                currActiveProgramId: programId,
                swimCategoryId: swimCategory.id,
                userId: dbUsr.id,
                currActiveProgramRep: 1,
                isCompleted: false,
            }
        })

        await expect(progressJourney()).resolves.toBeUndefined()

        const updatedJourney = await prisma.journey.findFirst({
            where: {
                id: mockCreatedJourney.id
            }
        })

        expect(updatedJourney?.currActiveProgramId).not.toBe(mockCreatedJourney.currActiveProgramId)
        expect(updatedJourney?.completedProgramIds).toHaveLength(1)
        expect(updatedJourney?.currActiveProgramRep).toBe(0)
        expect.assertions(4)
    })

    it("should complete journey completely", async () => {
        if (!swimCategory) throw new Error("Swim category not found in db. Test setup error?")
        if (!dbUsr) throw new Error("User not found in db. Test setup error?")
        if (!programId) throw new Error("Program not found in db. Test setup error?")

        const lastProgram = swimCategory.programs.pop()
        if (!lastProgram) throw new Error("Last program not found in db.")

        // set up active journey
        const mockCreatedJourney = await prisma.journey.create({
            data: {
                isActive: true,
                timeRepLastCompleted: dayjs(new Date).subtract(7, 'day').toDate(),
                completedProgramIds: [],
                currActiveProgramId: lastProgram.id,
                swimCategoryId: swimCategory.id,
                userId: dbUsr.id,
                currActiveProgramRep: lastProgram.reps - 1,
                isCompleted: false,
            }
        })

        await expect(progressJourney()).resolves.toBeUndefined()

        const updatedJourney = await prisma.journey.findFirst({
            where: {
                id: mockCreatedJourney.id
            }
        })

        await expect(updatedJourney?.isCompleted).toBe(true)
        await expect(updatedJourney?.currActiveProgramRep).toBe(lastProgram.reps)
        await expect(updatedJourney?.currActiveProgramId).toBe(lastProgram.id)

        expect.assertions(4)
    })
})