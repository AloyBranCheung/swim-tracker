'use server'
import prisma from '@/libs/prisma-client'
import getUserAction from '@/auth/get-user-action'
import { redirect } from 'next/navigation'

const startJourney = async (swimCategoryId: number) => {
    const userData = await getUserAction()
    const userId = userData?.dbUsr.id
    // check to see if there is an active journey for user and toggle isActive to false
    const activeJourney = await prisma.journey.findFirst({
        where: {
            userId,
            isActive: true,
        }
    })
    if (activeJourney) {
        await prisma.journey.update({
            where: {
                id: activeJourney.id
            },
            data: {
                isActive: false,
            }
        })
    }

    // check to see if user has put a pause on this journey (existing journey), if yes then toggle isActive to true
    const existingJourney = await prisma.journey.findFirst({
        where: {
            swimCategoryId,
            userId
        }
    })

    if (existingJourney) {
        await prisma.journey.update({
            where: {
                id: existingJourney.id
            },
            data: {
                isActive: true,
            }
        })
    } else {
        const [program] = await prisma.program.findMany({
            where: {
                swimCategoryId
            },
            orderBy: {
                order: 'asc',
            },
            take: 1
        })

        //  create new journey
        await prisma.journey.create({
            data: {
                swimCategoryId,
                userId: Number(userId),
                isActive: true,
                currActiveProgramId: program.id
            }
        })
    }

    redirect('/journey')
}

export default startJourney