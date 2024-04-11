// add urls to default Programs
import { ProgramLevel, PrismaClient, SwimCategory } from "@prisma/client"
import Pino from 'pino';

const prisma = new PrismaClient();

const logger = Pino({
    transport: {
        target: 'pino-pretty'
    }
})

const urls = {
    [ProgramLevel.BEGINNER]: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    [ProgramLevel.INTERMEDIATE]: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    [ProgramLevel.ADVANCED]: 'https://images.unsplash.com/photo-1530138897365-a9615c610099?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

const main = async () => {
    logger.info(`Adding urls to programs: ${Object.keys(ProgramLevel).join(', ')}`)

    const swimCategories = await prisma.swimCategory.findMany();

    const tasks = []

    const updateRow = async (swimCategory: SwimCategory) => {
        logger.info(`Updating id:${swimCategory.id} - ${swimCategory.category}`)
        await prisma.swimCategory.update({
            where: {
                id: swimCategory.id
            },
            data: {
                ...swimCategory
            }
        })
    }

    for (const category of swimCategories) {
        if (!category.url) {
            category.url = urls[category.category]
            tasks.push(updateRow(category))
        }
    }

    if (tasks.length < 1) {
        logger.info("Nothing to update here, exiting...")
        return
    }

    await Promise.all(tasks)

    logger.info("Done!")
}

main()