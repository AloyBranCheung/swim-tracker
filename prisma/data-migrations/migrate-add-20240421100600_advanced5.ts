import { ProgramLevel } from "@prisma/client"
// swim program
import {swimProgram} from "./swim-programs/advanced-program5"
// utils
import addOneWeek from "./util/addoneweek"

const main = async () => {
    await addOneWeek(swimProgram, ProgramLevel.ADVANCED)
}

main () 
