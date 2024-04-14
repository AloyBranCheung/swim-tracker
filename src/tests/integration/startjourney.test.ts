import { describe, vi, it, expect, beforeEach, afterEach } from 'vitest';
import { User } from '@prisma/client';
import { mockClear } from 'vitest-mock-extended';
// utils
import prisma from '../utils/prisma';
// mocks
import mockGetUserAction from '@/auth/__mocks__/get-user-action'
import mockUser from '../mocks/mockuser';
// test action
import startJourney from '@/actions/start-journey';

vi.mock('@/auth/get-user-action')
vi.mock('next/navigation')

describe("test start journey server action interaction with db", () => {
    let mockNextNavigation: typeof import('next/navigation');
    let testDbUsr: User;

    beforeEach(async () => {
        mockNextNavigation = await import('next/navigation')
        mockNextNavigation.redirect = vi.fn()

        // get test user from test-db
        const user = await prisma.user.findFirst({
            where: {
                email: mockUser.email
            }
        })
        if (!user) throw new Error("Error finding user in db. Test setup error?")
        testDbUsr = user

        mockGetUserAction.mockResolvedValue({
            dbUsr: user,
            auth0Usr: {
                name: mockUser.name,
                email: mockUser.email
            }
        })
    })

    afterEach(() => {
        mockClear(mockNextNavigation.redirect)
    })

    it('should create a new journey', async () => {
        // arrange
        const swimCategory = await prisma.swimCategory.findFirst()
        if (!swimCategory) throw new Error('Error finding swim category in db. Test setup error?')

        await expect(startJourney(swimCategory.id)).resolves.toBeUndefined()

        const journeys = await prisma.journey.findMany()
        if (!journeys) throw new Error("Error creating journey in db.")

        expect(journeys).not.toBeNull()
        expect(journeys).toHaveLength(1)
        expect(journeys.some((journey) => journey.isActive === false)).toBe(false)
        expect(mockNextNavigation.redirect).toHaveBeenCalledWith('/journey')
        expect(mockNextNavigation.redirect).toHaveBeenCalledTimes(1)

        expect.assertions(6)
    })

    it("should toggle an existing journey on from off", async () => {
        // arrange
        await prisma.journey.create({
            data: {
                isActive: true,
                timeRepLastCompleted: new Date(),
                completedProgramIds: [],
                currActiveProgramId: 1,
                swimCategoryId: 1,
                userId: testDbUsr.id,
                currActiveProgramRep: 0,
                isCompleted: false,
            }
        })
        const swimCategory = await prisma.swimCategory.findFirst({
            where: {
                id: 2,
            }
        })
        if (!swimCategory) throw new Error('Error finding swim category in db. Test setup error?')

        await expect(startJourney(swimCategory.id)).resolves.toBeUndefined()

        const journeys = await prisma.journey.findMany()

        expect(journeys).not.toBeNull()
        expect(journeys).toHaveLength(2)
        expect(journeys.some((journey) => journey.isActive === false)).toBe(true)

        expect(mockNextNavigation.redirect).toHaveBeenCalledWith('/journey')
        expect(mockNextNavigation.redirect).toHaveBeenCalledTimes(1)
        expect.assertions(6)
    })
})


