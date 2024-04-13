'use server'
import getUserAction from "@/auth/get-user-action";
import prisma from "@/libs/prisma-client";
import { revalidatePath } from "next/cache";

const progressJourney = async () => {
    const user = await getUserAction();
    if (!(user?.dbUsr)) throw new Error("User not found.")

    const currJourney = await prisma.journey.findFirst({
        where: {
            userId: user?.dbUsr.id,
            isActive: true,
        },
        include: {
            program: true,
            swimCategory: true,
        }
    })
    if (!currJourney) throw new Error("No active journey found.")

    const goalRep = currJourney.program.reps
    const currRep = currJourney.currActiveProgramRep

    if ((currRep < goalRep) && (currRep !== goalRep - 1)) {
        // +1 to curr program rep 
        await prisma.journey.update({
            where: {
                id: currJourney.id,
            },
            data: {
                currActiveProgramRep: currRep + 1
            }
        })
    } else {
        // next program step 
        const program = await prisma.program.findFirst({
            where: {
                swimCategoryId: currJourney.swimCategory.id,
                order: currJourney.program.order + 1,
            },
        })

        // user is done the swim journey
        if (!program) {
            if (currJourney.currActiveProgramRep === currJourney.program.reps - 1) {
                currJourney.completedProgramIds.push(currJourney.program.id)
                await prisma.journey.update({
                    where: {
                        id: currJourney.id,
                    },
                    data: {
                        currActiveProgramRep: currJourney.currActiveProgramRep + 1,
                        completedProgramIds: currJourney.completedProgramIds
                    }
                })
                revalidatePath('/journey')
                return
            }
            return
        }

        // reset curr rep
        currJourney.completedProgramIds.push(currJourney.program.id)
        await prisma.journey.update({
            where: {
                id: currJourney.id,
            },
            data: {
                currActiveProgramId: program.id,
                currActiveProgramRep: 0,
                completedProgramIds: currJourney.completedProgramIds
            }
        })
    }

    revalidatePath('/journey')
}
export default progressJourney