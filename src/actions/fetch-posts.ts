'use server'
import prisma from '@/libs/prisma-client';
import getUserAction from '@/auth/get-user-action';

export const fetchPosts = async (cursor: number) => {
    try {
        const usrDetails = await getUserAction();
        if (!usrDetails) throw new Error("Unauthorized")
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
        console.error(error);
        return []
    }
}
