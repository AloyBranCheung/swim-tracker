import addOneWeek from "./util/addoneweek"
import { swimProgram } from "./swim-programs/beginner-program3"
import { ProgramLevel } from "@prisma/client"

const main = async () => {
    await addOneWeek(swimProgram, ProgramLevel.BEGINNER)
}
main()