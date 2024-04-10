'use server'
import prisma from '@/libs/prisma-client'
import getUserAction from '@/auth/get-user-action'

const startJourney = async (swimCategoryId: number) => {
    const userData = await getUserAction()
    // check to see if there is an active journey for user and toggle isActive to false
    // check to see if user has put a pause on this journey (existing), if yes then toggle isActive to true
    // else create new journey
}

export default startJourney