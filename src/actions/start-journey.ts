'use server'
import prisma from '@/libs/prisma-client'
import getUserAction from '@/auth/get-user-action'

const startJourney = async (swimCategoryId: number) => {
    console.log('server', swimCategoryId)
}

export default startJourney