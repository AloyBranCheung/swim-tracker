import { FullConfig } from '@playwright/test'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalTeardown = async (config: FullConfig) => {
    const user = await prisma.user.findFirst({
        where: {
            email: process.env.TEST_USER
        }
    })
    if (!user) throw new Error("User not found!")
    await prisma.journey.deleteMany({
        where: {
            userId: user.id
        }
    })
}

export default globalTeardown

