/* eslint-disable @typescript-eslint/no-var-requires */
/** migrate programs to db credit to https://speedo.com.au/swim-workouts/ */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { PrismaClient, ProgramLevel } from '@prisma/client'
import Pino from 'pino';
import { swimProgram as beginnerProgram1 } from './swim-programs/beginner-program1'


const prisma = new PrismaClient()

const logger = Pino({
    transport: {
        target: 'pino-pretty'
    }
})


const main = async () => {
    // populate swim program categories
    const categories = await prisma.swimCategory.findMany();
    if (categories.length < 1) {
        const programLevels = Object.values(ProgramLevel).map((level) => ({ category: level, url: '' }))
        await prisma.swimCategory.createMany({
            data: programLevels
        })
        logger.info(`Successfully added {${Object.values(ProgramLevel).join(' ')}} to SwimCategory table`)
    } else {
        logger.info(`SwimCategory table already populated. Not adding to table.`)
    }

    // populate swim programs and exercises 
    const swimCategories = await prisma.swimCategory.findMany();
    const programs = await prisma.program.findMany();
    if (programs.length < 1) {
        logger.info("Adding programs...")
        const categories = Object.keys(beginnerProgram1);
        for (const category of categories) {
            const programsArr = beginnerProgram1[category as keyof typeof beginnerProgram1];
            for (const programObj of programsArr) {
                const programName = programObj.programName
                const exercises = programObj.exercises
                const categoryId = swimCategories.find((categoryObj) => categoryObj.category === category)?.id

                if (!categoryId) throw new Error("Category ID not found")

                const { id: programId } = await prisma.program.create({
                    data: {
                        name: programName,
                        order: programObj.order,
                        swimCategoryId: categoryId,
                    }
                })

                await prisma.swimExercise.createMany({
                    data: exercises.map((exercise) => ({
                        ...exercise,
                        programId,
                    }))
                })
                logger.info(`Successfully added program (${programName}) with ${exercises.length} swim exercises to ${category} category`)
            }
        }
    } else {
        logger.info("Programs exist. Not adding to table.")
    }

}

main()

