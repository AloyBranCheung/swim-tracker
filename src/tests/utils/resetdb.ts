import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resetDb = async () => {
    await prisma.$transaction([
        prisma.journey.deleteMany(),
        prisma.program.deleteMany(),
        prisma.statusPost.deleteMany(),
        prisma.swimCategory.deleteMany(),
        prisma.swimExercise.deleteMany(),
        prisma.user.deleteMany(),
        prisma.userSwimActivityLog.deleteMany(),
    ])
}

export default resetDb; 