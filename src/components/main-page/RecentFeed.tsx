import React from 'react'
import prisma from '@/libs/prisma-client';
// utils
import { dateFormatter } from '@/utils/dayjs'
// actions
import getUserAction from '@/auth/get-user-action';
// components
import CardContainer from '../CardContainer'
import Card from '../Card';

// last 3 posts
export default async function RecentFeed() {
    await getUserAction(); // also an auth check 
    const latestPosts = await prisma.statusPost.findMany({
        include: {
            user: true,
        },
        take: 3,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <CardContainer className="flex flex-col gap-2">
            <h2 className='text-lg font-semibold text-gray-200 text-opacity-80'>
                Latest Posts
            </h2>
            <div className='flex flex-col gap-2'>
                {latestPosts.length > 0 ? latestPosts.map((post) =>
                    <Card key={post.id} className="flex flex-col gap-2">
                        <div className='flex justify-between items-center text-sm'>
                            <p className='text-gray-600'>{post.user.name}</p>
                            <p className='text-gray-600'>{dateFormatter(post.createdAt)}</p>
                        </div>
                        <p className='break-words'>
                            {post.msg}
                        </p>
                    </Card>
                ) : <p className='self-center text-gray-200 text-opacity-65'>Say something witty to get started :&#41;</p>}
            </div>
        </CardContainer>
    )
}
