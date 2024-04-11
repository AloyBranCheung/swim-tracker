// add week 1 program for INTERMEDIATE swim category
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import Pino from 'pino';
import { PrismaClient } from '@prisma/client';

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
            category: 'INTERMEDIATE'
        }
    })
    const programs = await prisma.program.findMany({
        where: {
            swimCategoryId: swimCategory?.id
        }
    })
    console.log(programs)



}

main()