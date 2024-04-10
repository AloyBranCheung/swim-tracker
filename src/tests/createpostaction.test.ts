import { describe, it, vi, expect } from "vitest";
// action
import createPost from "@/actions/create-post";
import { User } from "@prisma/client";

vi.mock("next-auth");

vi.mock("@/libs/prisma-client")

vi.mock("next/cache")

const mockUser = {
    user: {
        email: "test@test.com",
    },
}

const mockDbUserRes = {
    id: 1,
    email: 'test@test.com',
    name: 'test',
    auth0Id: 'auth0|1234',
    createdAt: new Date(),
    updatedAt: new Date()
}

const createMocks = async (mockAuthUser: { user: { email: string } } | null, mockDbUser: User | null) => {
    const mockNextCache = await import('next/cache')
    mockNextCache.revalidatePath = vi.fn()

    const mockNextAuth = await import('next-auth')
    mockNextAuth.getServerSession = vi.fn().mockReturnValue(mockAuthUser)

    const mockPrismaClient = await import('@/libs/prisma-client')
    mockPrismaClient.default.user.findUnique = vi.fn().mockResolvedValue(mockDbUser)
    mockPrismaClient.default.statusPost.create = vi.fn()

    const mockPrevState = {
        msg: "",
        errors: {},
        success: false,
    };

    const mockFormData = new FormData();
    mockFormData.append("msg", "test msg");

    return { mockPrevState, mockFormData, mockNextAuth, mockPrismaClient, mockNextCache }

}

// todo: SETUP test db
describe("test create post action", () => {
    it("should return success true", async () => {
        // arrange
        const { mockPrevState, mockFormData, mockNextAuth, mockPrismaClient, mockNextCache } = await createMocks(mockUser, mockDbUserRes)

        // act
        const result = await createPost(mockPrevState, mockFormData);

        // assert
        expect(mockNextAuth.getServerSession).toHaveBeenCalledOnce()
        expect(mockPrismaClient.default.statusPost.create).toHaveBeenCalledOnce()
        expect(mockPrismaClient.default.user.findUnique).toHaveBeenCalledOnce()
        expect(result.msg).toBe('')
        expect(result.errors).toEqual({})
        expect(result.success).toBe(true)
        expect(mockNextCache.revalidatePath).toHaveBeenCalledOnce()
    });
    it("should return success false and unauthorized", async () => {
        // arrange
        const { mockPrevState, mockFormData, mockNextAuth, mockPrismaClient, mockNextCache } = await createMocks(null, mockDbUserRes)

        // act
        const result = await createPost(mockPrevState, mockFormData);

        // assert
        expect(result.success).toBe(false)
        expect(result.msg).toBe('test msg')
        expect(result.errors).toEqual({ msg: ['Unauthorized'] })
        expect(mockNextAuth.getServerSession).toHaveBeenCalledOnce()
        expect(mockPrismaClient.default.user.findUnique).not.toHaveBeenCalled()
        expect(mockPrismaClient.default.statusPost.create).not.toHaveBeenCalled()
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
    })
    it("should return success false and error finding user", async () => {
        // arrange
        const { mockPrevState, mockFormData, mockNextAuth, mockPrismaClient, mockNextCache } = await createMocks(mockUser, null)

        // act 
        const result = await createPost(mockPrevState, mockFormData);

        // assert
        expect(result.success).toBe(false)
        expect(result.msg).toBe('test msg')
        expect(result.errors).toEqual({ msg: ['Error finding user'] })
        expect(mockNextAuth.getServerSession).toHaveBeenCalledOnce()
        expect(mockPrismaClient.default.user.findUnique).toHaveBeenCalledOnce()
        expect(mockPrismaClient.default.statusPost.create).not.toHaveBeenCalled()
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
    })
    it("should return success false and validation error", async () => {
        // arrange
        const { mockPrevState, mockFormData, mockNextAuth, mockPrismaClient, mockNextCache } = await createMocks(mockUser, mockDbUserRes)
        mockFormData.delete('msg')

        // act
        const result = await createPost(mockPrevState, mockFormData);

        // arrange
        expect(result.msg).toBe(null)
        expect(result.errors).toEqual({ msg: ['Expected string, received null'] })
        expect(result.success).toBe(false)
        expect(mockNextAuth.getServerSession).not.toHaveBeenCalled()
        expect(mockPrismaClient.default.user.findUnique).not.toHaveBeenCalled()
        expect(mockPrismaClient.default.statusPost.create).not.toHaveBeenCalled()
        expect(mockNextCache.revalidatePath).not.toHaveBeenCalled()
    })
});
