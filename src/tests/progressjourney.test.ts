import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
// mocks
import getUserActionMock from "@/auth/__mocks__/get-user-action";
import prismaMock from "@/libs/__mocks__/prisma-client";
import { mockGetUserAction } from "./mocks/mockuser";
import mockCurrJourneyResponse from "./mocks/mockcurrjourneyresponse";
// target of test 
import progressJourney from "@/actions/progress-journey";
import dayjs from "dayjs";
import { mockClear } from "vitest-mock-extended";

vi.mock("@/libs/prisma-client");
vi.mock("@/auth/get-user-action");
vi.mock("next/cache");

describe("test progress journey server action", () => {
    let mockNextCache: typeof import('next/cache');

    beforeEach(async () => {
        mockNextCache = await import('next/cache')
        mockNextCache.revalidatePath = vi.fn()
    })

    afterEach(async () => {
        mockClear(mockNextCache.revalidatePath)
    })

    it("should throw error if no user is found", async () => {
        const mockNextCache = await import('next/cache')
        mockNextCache.revalidatePath = vi.fn()
        getUserActionMock.mockResolvedValue(undefined)

        await expect(progressJourney()).rejects.toThrow('User not found.')
        /**
         * for asynchronous promise resolve/rejects 
         * https://vitest.dev/api/expect
         * WARNING If the assertion is not awaited, then you will have a
           false-positive test that will pass every time. To make sure that
           assertions are actually called, you may use
           expect.assertions(number).
         */
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
        expect.assertions(2)
    })
    it("should throw error if no active journey is found", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)

        await expect(progressJourney()).rejects.toThrow("No active journey found.")
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
        expect.assertions(2)
    })
    it("should not progress/make mutations when it is not the next day since timeRepLastCompleted", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValue({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).add(7, 'day').toDate() })

        await expect(progressJourney()).rejects.toThrow("Not the next day.")
        expect(prismaMock.journey.findFirst).toHaveBeenCalled()
        expect(prismaMock.journey.update).not.toHaveBeenCalled()
        expect(prismaMock.program.findFirst).not.toHaveBeenCalled()
        expect(prismaMock.userSwimActivityLog.create).not.toHaveBeenCalled()
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
        expect.assertions(6)
    })
    it("should progress and return undefined if it is the start of the next day since last completed", async () => {
        const mockNextCache = await import('next/cache')
        mockNextCache.revalidatePath = vi.fn()
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValue({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).subtract(7, 'day').toDate() })

        await expect(progressJourney()).resolves.toBeUndefined()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledWith('/journey')

        expect(prismaMock.journey.findFirst).toHaveBeenCalledOnce()

        expect(prismaMock.program.findFirst).not.toHaveBeenCalled()

        expect(prismaMock.journey.update).toHaveBeenCalledOnce()
        expect(prismaMock.userSwimActivityLog.create).toHaveBeenCalledOnce()

        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
        expect.assertions(7)
    })
    it("should progress to next step in program and add swim activity log", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValue({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).subtract(7, 'day').toDate(), currActiveProgramRep: 0 })

        await expect(progressJourney()).resolves.toBeUndefined()
        expect(prismaMock.journey.findFirst).toHaveBeenCalledOnce()

        expect(prismaMock.program.findFirst).not.toHaveBeenCalledOnce()

        expect(prismaMock.journey.update).toHaveBeenCalledOnce()
        expect(prismaMock.userSwimActivityLog.create).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledWith('/journey')


        expect.assertions(7)
    })
    it("should complete program, add to completed programs, and start next program and add swim activity log", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValue({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).subtract(7, 'day').toDate(), currActiveProgramRep: 1 })

        await expect(progressJourney()).resolves.toBeUndefined()
        expect(prismaMock.journey.findFirst).toHaveBeenCalledOnce()

        expect(prismaMock.program.findFirst).toHaveBeenCalledOnce()
        expect(prismaMock.journey.update).toHaveBeenCalledOnce()

        expect(prismaMock.userSwimActivityLog.create).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledWith('/journey')


        expect.assertions(7)
    })
    it("should complete journey and do nothing if somehow function is triggered again", async () => {
        getUserActionMock.mockResolvedValue(mockGetUserAction)
        prismaMock.journey.findFirst.mockResolvedValueOnce({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).subtract(7, 'day').toDate(), currActiveProgramRep: 1 })

        await expect(progressJourney()).resolves.toBeUndefined()
        expect(prismaMock.journey.findFirst).toHaveBeenCalledOnce()

        expect(prismaMock.program.findFirst).toHaveBeenCalledOnce()

        // first time
        expect(prismaMock.journey.update).toHaveBeenCalledOnce()
        expect(prismaMock.userSwimActivityLog.create).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledWith('/journey')


        prismaMock.journey.findFirst.mockResolvedValueOnce({ ...mockCurrJourneyResponse, timeRepLastCompleted: dayjs(new Date()).subtract(7, 'day').toDate(), currActiveProgramRep: 2 })
        prismaMock.program.findFirst.mockResolvedValueOnce(null)

        await expect(progressJourney()).resolves.toBeUndefined()
        expect(prismaMock.journey.findFirst).toHaveBeenCalledTimes(2)

        expect(prismaMock.program.findFirst).toHaveBeenCalledTimes(2)

        // second time is not called 
        expect(prismaMock.journey.update).toHaveBeenCalledOnce()
        expect(prismaMock.userSwimActivityLog.create).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
        expect(mockNextCache.revalidatePath).toHaveBeenCalledWith('/journey')

        expect.assertions(14)

    })
})