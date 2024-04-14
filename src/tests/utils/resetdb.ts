import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resetDb = async () => {
    await prisma.$transaction([
        prisma.journey.deleteMany(),
        prisma.statusPost.deleteMany(),
        prisma.user.deleteMany(),
        prisma.userSwimActivityLog.deleteMany(),
        /**
         * don't delete these because they are static data from
         * data-migrations...maybe in the future when these tables are more
         * dynamic
         * prisma.program.deleteMany(), 
         * prisma.swimCategory.deleteMany(),
         * prisma.swimExercise.deleteMany(),
         */
    ])
}

export default resetDb; 