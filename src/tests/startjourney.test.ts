import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { mockClear } from 'vitest-mock-extended'
// mocks
import mockGetUserAction from '@/auth/__mocks__/get-user-action'
import mockPrisma from '@/libs/__mocks__/prisma-client'
import { mockGetUserAction as mockGetUserActionData } from './mocks/mockuser'
// to test
import startJourney from '@/actions/start-journey'

vi.mock('@/auth/get-user-action')
vi.mock('@/libs/prisma-client')
vi.mock('next/navigation')

describe("test start joureny server action", () => {
    let mockRedirect: typeof import('next/navigation');

    beforeEach(async () => {
        mockRedirect = await import('next/navigation');
        mockRedirect.redirect = vi.fn()
    })

    afterEach(() => {
        mockClear(mockRedirect.redirect)
    })

    it("should throw error when user is not found", async () => {
        mockGetUserAction.mockResolvedValue(null)

        await expect(startJourney(1)).rejects.toThrow("Unauthorized")

        expect(mockRedirect.redirect).not.toHaveBeenCalled()
        expect.assertions(2)
    })

    it("should toggle an active journey to inactive and an existing inactive journey to active", async () => {
        mockGetUserAction.mockResolvedValue(mockGetUserActionData)
        mockPrisma.journey.findFirst.mockResolvedValue({
            id: 1,
            completedProgramIds: [],
            createdAt: new Date(),
            currActiveProgramId: 1,
            currActiveProgramRep: 0,
            isActive: true,
            isCompleted: false,
            swimCategoryId: 1,
            timeRepLastCompleted: new Date(),
            updatedAt: new Date(),
            userId: 1
        })

        await expect(startJourney(1)).resolves.toBeUndefined()

        expect(mockPrisma.journey.update).toHaveBeenCalledTimes(2)
        expect(mockPrisma.journey.findFirst).toHaveBeenCalledTimes(2)
        expect(mockPrisma.program.findMany).not.toHaveBeenCalled()
        expect(mockPrisma.journey.create).not.toHaveBeenCalled()
        expect(mockRedirect.redirect).toHaveBeenCalledOnce()
        expect(mockRedirect.redirect).toHaveBeenCalledWith('/journey')
    })

    it("should not find an active journey or existing journey and create a new journey", async () => {
        mockGetUserAction.mockResolvedValue(mockGetUserActionData)
        mockPrisma.journey.findFirst.mockResolvedValue(null)
        mockPrisma.program.findMany.mockResolvedValue([
            {
                id: 1,
                createdAt: new Date(),
                name: 'Week 1',
                order: 1,
                reps: 2,
                swimCategoryId: 1,
                updatedAt: new Date()
            }
        ])

        await expect(startJourney(1)).resolves.toBeUndefined()

        expect(mockPrisma.journey.findFirst).toHaveBeenCalledTimes(2)
        expect(mockPrisma.program.findMany).toHaveBeenCalledTimes(1)
        expect(mockPrisma.journey.create).toHaveBeenCalledTimes(1)
        expect(mockPrisma.journey.update).not.toHaveBeenCalled()
        expect(mockRedirect.redirect).toHaveBeenCalledOnce()
        expect(mockRedirect.redirect).toHaveBeenCalledWith('/journey')
    })

})