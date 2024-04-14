import { describe, it, vi, expect } from 'vitest'
import prismaMock from '@/libs/__mocks__/prisma-client'
import mockGetUserAction from '@/auth/__mocks__/get-user-action'
import { fetchPosts } from "@/actions/fetch-posts";

vi.mock('@/libs/prisma-client')

vi.mock('@/auth/get-user-action')

const date = new Date()

const mockPost = [{ id: 1, createdAt: date, updatedAt: date, msg: 'testmsg', userId: 1 }]

describe('test fetchposts server action', () => {
    it('should return posts', async () => {
        mockGetUserAction.mockResolvedValue({
            dbUsr: {
                id: 1,
                email: 'test@test.com'
            }
        })

        prismaMock.statusPost.findMany.mockResolvedValue(mockPost)

        const posts = await fetchPosts(0)

        expect(posts.length).toBe(1)
        expect(posts).toEqual(mockPost)
    })
    it("should throw an error if not authenticated", async () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);
        mockGetUserAction.mockResolvedValue(null)
        try {
            await fetchPosts(0)
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe("Unauthorized")
            }
        }

        await expect(fetchPosts(0)).resolves.toStrictEqual([])
    })
})