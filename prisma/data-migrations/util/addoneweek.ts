import { ProgramLevel } from "@prisma/client";
import { WorkoutSession } from "./SwimProgramBuilder";
import { PrismaClient } from '@prisma/client';
import Pino from 'pino';

const prisma = new PrismaClient();

const logger = Pino({
    transport: {
        target: 'pino-pretty'
    }
})

const addOneWeek = async (swimProgram: WorkoutSession, category: ProgramLevel) => {
    logger.info(`Adding program to ${category}`)

    const swimCategory = await prisma.swimCategory.findFirst({
        where: {
            category
        },
        include: {
            programs: true
        }
    })

    if (!swimCategory?.id) {
        logger.info("SwimCategory not found, aborting...")
        return;
    }

    for (const program of swimProgram[category]) {
        if (swimCategory.programs.some((swimpro) => swimpro.name === program.programName)) {
            logger.info("found existing program, skipping...")
            continue
        }

        await prisma.program.create({
            data: {
                name: program.programName,
                order: program.order,
                swimCategoryId: swimCategory.id,
                swimExercise: {
                    create: program.exercises
                }
            }
        })
    }

    logger.info('Done!')
}

export default addOneWeek