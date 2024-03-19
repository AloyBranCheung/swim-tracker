'use server'
import logger from '@/libs/logger'
import prisma from '@/libs/prisma-client';
import getUserAction from '@/auth/get-user-action';

export const fetchPosts = async (cursor: number) => {
    try {
        logger.info("Fetching 10 posts...")
        await getUserAction();
        const posts = await prisma.statusPost.findMany({
            include: {
                user: true,
            },
            take: 10,
            skip: (cursor as number) * 10,
            orderBy: {
                createdAt: "desc",
            },
        });
        return posts;
    } catch (error) {
        logger.error(error);
        return []
    }
}
