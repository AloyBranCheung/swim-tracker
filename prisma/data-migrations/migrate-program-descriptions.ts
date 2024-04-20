import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' })

import { PrismaClient, ProgramLevel } from '@prisma/client';
import Pino from 'pino';

const logger = Pino({
    transport: {
        target: "pino-pretty"
    }
})

const prisma = new PrismaClient();

const BEGINNER = ["I'm getting back into it", "I want to build some swim stamina and skills", "Starting from 500m"]

const INTERMEDIATE = ["I regularly swim for fitness", "I want to improve my swim skills", "From 750m"]

const ADVANCED = ["Improve my skills and fitness", "I want to push myself that bit more", "From 900m"]

const main = async () => {
    logger.info("Grabbing program ids")
    const levels = await prisma.swimCategory.findMany({
        select: {
            id: true,
            category: true,
            descriptions: true,
        }
    })

    const updateSwimCategory = async (descriptions: string[], id: string) => {
        await prisma.swimCategory.update({
            data: {
                descriptions
            },
            where: {
                id
            }
        })
    }

    const tasksArr = []
    for (const { id, category, descriptions } of levels) {
        if (descriptions.length > 0) return logger.info('Description exists. Exiting...')
        switch (category) {
            case ProgramLevel.BEGINNER:
                tasksArr.push(updateSwimCategory(BEGINNER, id))
                break;
            case ProgramLevel.INTERMEDIATE:
                tasksArr.push(updateSwimCategory(INTERMEDIATE, id))
                break;
            case ProgramLevel.ADVANCED:
                tasksArr.push(updateSwimCategory(ADVANCED, id))
                break;
            default:
                logger.error(`Unknown category: ${category}`)
                break;
        }
    }
    logger.info(`Executing ${tasksArr.length} tasks.`)
    await Promise.all(tasksArr)
    logger.info("Successfully added descriptions to SwimCategory table")
}

main() 