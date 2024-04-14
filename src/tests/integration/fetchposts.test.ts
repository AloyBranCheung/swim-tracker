import { vi, describe, it, expect, beforeEach } from "vitest";
import prisma from "../utils/prisma";
// mocks
import getUserActionMock from "@/auth/__mocks__/get-user-action";
import mockUser from "../mocks/mockuser";
// to test
import { fetchPosts } from "@/actions/fetch-posts";

vi.mock("@/auth/get-user-action");

describe('test fetch posts server action interaction with db', () => {
    beforeEach(async () => {
        const user = await prisma.user.findFirst({
            where: {
                email: mockUser.email
            }
        })
        if (!user) throw new Error("Test failed: User not found.")

        await prisma.statusPost.createMany({
            data: new Array(21).fill(0).map((_, i) => ({
                msg: `msg ${i + 1}`,
                userId: user?.id,
            }))
        })

        getUserActionMock.mockResolvedValue({
            dbUsr: user
        })
    })

    it('should return posts', async () => {
        // act
        const posts = await fetchPosts(0)

        // assert
        expect(posts).toHaveLength(10)
        expect(posts.some((post) => post.msg === 'msg 0')).not.toBe(true)
        expect(posts.some((post) => post.msg === 'msg 1')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 2')).toBe(true)

        expect(posts.some((post) => post.msg === 'msg 9')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 10')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 11')).not.toBe(true)
    })

    it('should skip first 10 posts', async () => {
        // act
        const posts = await fetchPosts(1)


        // assert
        expect(posts).toHaveLength(10)
        expect(posts.some((post) => post.msg === 'msg 10')).not.toBe(true)
        expect(posts.some((post) => post.msg === 'msg 11')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 12')).toBe(true)

        expect(posts.some((post) => post.msg === 'msg 19')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 20')).toBe(true)
        expect(posts.some((post) => post.msg === 'msg 21')).not.toBe(true)
    })
})

