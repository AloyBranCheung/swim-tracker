// add week 1 program for INTERMEDIATE swim category
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import Pino from 'pino';
import { PrismaClient } from '@prisma/client';
// data
import { swimProgram } from './swim-programs/advanced-program1';

const prisma = new PrismaClient();

const logger = Pino({
    transport: {
        target: 'pino-pretty'
    }
})

const main = async () => {
    // check if week 1 program for intermediate swim category exists
    logger.info("Checking if program already exists...")
    const swimCategory = await prisma.swimCategory.findFirst({
        where: {
            category: 'ADVANCED'
        }
    })

    if (!swimCategory?.id) {
        logger.error("No swim category ID found, exiting...")
        return
    }

    const programs = await prisma.program.findMany({
        where: {
            swimCategoryId: swimCategory.id
        }
    })
    if (programs.length > 0) {
        logger.info("Program already exists, skipping...")
        return
    }
    logger.info("Program does not exist, creating...")
    for (const program of swimProgram.ADVANCED) {
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
    logger.info("Done!")
}

main()