'use server'
import dayjs from 'dayjs'
import prisma from '@/libs/prisma-client'
import getUserAction from '@/auth/get-user-action'
import { redirect } from 'next/navigation'

const startJourney = async (swimCategoryId: string) => {
    const userData = await getUserAction()
    if (!userData || !userData.dbUsr) throw Error("Unauthorized")

    const userId = userData.dbUsr.id
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
                userId: userId,
                isActive: true,
                currActiveProgramId: program.id,
                timeRepLastCompleted: dayjs(new Date()).subtract(2, 'day').toISOString()
            }
        })
    }

    redirect('/journey')
}

export default startJourney