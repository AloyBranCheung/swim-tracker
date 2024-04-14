import { describe, it, vi, expect, beforeEach } from "vitest";
import { auth } from "@/auth/__mocks__/auth-helper";
import prisma from "../utils/prisma";
// to test
import createPost from "@/actions/create-post";
import mockUser from "../mocks/mockuser";

vi.mock("@/auth/auth-helper")
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn()
}))

const mockPost = new FormData()
mockPost.append('msg', 'testmsg')
const mockPreviousState = { msg: '', errors: {}, success: false }

describe("test create post server action - db interaction", () => {
    beforeEach(() => {
        auth.mockResolvedValue({
            user: {
                email: mockUser.email
            }
        })
    })

    it("should create a post", async () => {
        // act
        await createPost(mockPreviousState, mockPost)

        // assert
        const user = await prisma.user.findFirst({
            where: {
                email: mockUser.email
            }
        })
        expect(user).not.toBeNull()

        const post = await prisma.statusPost.findFirst({
            where: {
                userId: user?.id
            }
        })
        expect(post).not.toBeNull()
        expect(post?.msg).toBe('testmsg')
    })
    it("should return error if user is not found in db", async () => {
        // arrange
        auth.mockResolvedValue({
            user: {
                email: 'notfound@notfound.com'
            }
        })

        // act
        const post = await createPost(mockPreviousState, mockPost)

        // assert
        expect(post).not.toBeNull()
        expect(post).toStrictEqual({
            errors: { msg: ['Error finding user'] },
            msg: 'testmsg',
            success: false
        })
    })
    it('should catch error and return error msg', async () => {
        // arrange
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        auth.mockRejectedValue({
            user: {
                email: null
            }
        })

        // act
        const post = await createPost(mockPreviousState, mockPost)

        // assert
        expect(post).not.toBeNull()
        expect(post).toStrictEqual({
            msg: 'testmsg',
            errors: { msg: ['Error creating post.'] },
            success: false
        })
    })
})