import { afterEach, beforeEach, describe, it, vi, expect } from 'vitest';
import mockGetUserAction from '@/auth/__mocks__/get-user-action'
// test this
import createSwimActivity, { FormState } from '@/actions/create-swim-activity';

vi.mock('@/auth/get-user-action')
vi.mock('next/cache')
vi.mock('@/libs/prisma-client')


describe('test create swim activity server action', () => {
    let mockInitialState: FormState | undefined;

    beforeEach(() => {
        mockGetUserAction.mockResolvedValue({
            dbUsr: {
                id: 1,
                email: 'test@test.com'
            }
        })

        mockInitialState = {
            swimDistance: '',
        }
    })
    afterEach(() => {
        mockInitialState = undefined
    })

    it("should return error no swim distance provided", async () => {
        if (!mockInitialState) throw new Error("mock initial state not defined, test setup error?")
        const mockFormData = new FormData();

        const response = await createSwimActivity(mockInitialState, mockFormData)

        expect(response.msg).toBe("Error: no swim distance provided")
    })

    it("should return validation error message", async () => {
        if (!mockInitialState) throw new Error("mock initial state not defined, test setup error?")

        const mockFormData = new FormData();
        mockFormData.append('swimDistance', 'test');

        const response = await createSwimActivity(mockInitialState, mockFormData)

        expect(response.msg).toBe("Error: Not a valid swim distance.")
    })

    it('should return success true', async () => {
        if (!mockInitialState) throw new Error("mock initial state not defined, test setup error?")

        const mockFormData = new FormData();
        mockFormData.append('swimDistance', '100');

        const response = await createSwimActivity(mockInitialState, mockFormData)

        expect(response.success).toBe(true)
    })
})