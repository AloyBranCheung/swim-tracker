import { expect, describe, MockInstance, it, vi, beforeAll, afterAll } from "vitest";
import getUserAction from "@/auth/get-user-action";
// mocks
import { auth as getServerSession } from "@/auth/__mocks__/auth-helper";
import prismaMock from "@/libs/__mocks__/prisma-client";
import mockUser from "./mocks/mockuser";

vi.mock("@/auth/auth-helper")
vi.mock("@/libs/prisma-client")

const mockSession = {
    user: {
        email: "test@test.com",
    },
}

describe("test get user server action", () => {
    let consoleErrorSpy: MockInstance;
    beforeAll(() => {
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    })
    afterAll(() => {
        consoleErrorSpy.mockReset();
    })
    it("should return user", async () => {
        getServerSession.mockReturnValue(mockSession);
        prismaMock.user.findUnique.mockResolvedValue(mockUser);

        const user = await getUserAction();

        expect(user).toEqual({
            dbUsr: mockUser,
            auth0Usr: mockSession.user
        })
    })

    it("should return empty object and throw unauthorized error message", async () => {
        getServerSession.mockRejectedValue(null)

        try {
            await getUserAction();
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe("Unauthorized")
            }
        }

        expect(getUserAction()).resolves.toBeUndefined()
    })
});
