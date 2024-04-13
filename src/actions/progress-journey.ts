'use server'
import { revalidatePath } from "next/cache";
// auth
import getUserAction from "@/auth/get-user-action";
// prisma 
import prisma from "@/libs/prisma-client";
// utils
import { calculateTotalDistanceSwam } from "@/utils/swim-exercises";
import { isNextDay } from "@/utils/dayjs";

const progressJourney = async () => {
    const user = await getUserAction();
    if (!(user?.dbUsr)) throw new Error("User not found.")

    // get the current active journey (only one isActive = true for all journeys user has ongoing)
    const currJourney = await prisma.journey.findFirst({
        where: {
            userId: user?.dbUsr.id,
            isActive: true,
        },
        include: {
            program: {
                include: {
                    swimExercise: true,
                }
            },
            swimCategory: true,
        }
    })
    if (!currJourney) throw new Error("No active journey found.")

    /**
     * goalRep = Program total reps (how many times a user should finish the workout/program)
     * currRep = Current active program rep (how many times the user has completed the current program)
     */

    const goalRep = currJourney.program.reps
    const currRep = currJourney.currActiveProgramRep

    if (!isNextDay(currJourney.timeRepLastCompleted)) return

    // e.g. 1 < 3 but on completion will be 2/3 but not 3/3
    if ((currRep < goalRep) && (currRep !== goalRep - 1)) {
        // +1 to curr program rep 
        await prisma.journey.update({
            where: {
                id: currJourney.id,
            },
            data: {
                currActiveProgramRep: currRep + 1,
                timeRepLastCompleted: new Date().toISOString()
            }
        })

        // add activity log for distance swam 
        await prisma.userSwimActivityLog.create({
            data: {
                totalDistanceSwam: calculateTotalDistanceSwam(currJourney.program.swimExercise),
                unit: currJourney.program.swimExercise[0].unit,
                userId: user.dbUsr.id
            }
        })
    } else {
        // next step in SwimCategory programs (i.e. next program to complete)
        const nextProgram = await prisma.program.findFirst({
            where: {
                swimCategoryId: currJourney.swimCategory.id,
                order: currJourney.program.order + 1, // this determines the next program/order of the programs to complete
            },
        })

        // user is done the swim journey if cannot find the next program
        if (!nextProgram) {
            // e.g. if user is 2/3 then on completion of the program/swimcategory completely then will be 3/3, that's it
            if (currJourney.currActiveProgramRep === currJourney.program.reps - 1) {
                currJourney.completedProgramIds.push(currJourney.program.id) // add completed program to completed programs array 
                await prisma.journey.update({
                    where: {
                        id: currJourney.id,
                    },
                    data: {
                        currActiveProgramRep: currJourney.currActiveProgramRep + 1,
                        completedProgramIds: currJourney.completedProgramIds,
                        isCompleted: true,
                        timeRepLastCompleted: new Date().toISOString()
                    }
                })
                // add activity log for distance swam 
                await prisma.userSwimActivityLog.create({
                    data: {
                        totalDistanceSwam: calculateTotalDistanceSwam(currJourney.program.swimExercise),
                        unit: currJourney.program.swimExercise[0].unit,
                        userId: user.dbUsr.id
                    }
                })
                revalidatePath('/journey')
                return
            }
            // user will forever be stuck here once the SwimCategory is complete (i.e. all programs are completed/in the completedProgramIds array)
            return
        }

        // user will progress to the next program e.g. program 1 2/2 -> program 2 0/2
        // reset curr rep
        currJourney.completedProgramIds.push(currJourney.program.id) // add completed program to completed programs array 
        await prisma.journey.update({
            where: {
                id: currJourney.id,
            },
            data: {
                currActiveProgramId: nextProgram.id,
                currActiveProgramRep: 0,
                completedProgramIds: currJourney.completedProgramIds,
                timeRepLastCompleted: new Date().toISOString()
            }
        })
        // add activity log for distance swam 
        await prisma.userSwimActivityLog.create({
            data: {
                totalDistanceSwam: calculateTotalDistanceSwam(currJourney.program.swimExercise),
                unit: currJourney.program.swimExercise[0].unit,
                userId: user.dbUsr.id
            }
        })
    }

    revalidatePath('/journey')
}
export default progressJourney