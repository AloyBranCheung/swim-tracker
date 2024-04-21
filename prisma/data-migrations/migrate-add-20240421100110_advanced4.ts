import { ProgramLevel } from "@prisma/client"
// swim program
import {swimProgram} from "./swim-programs/advanced-program4"
// utils
import addOneWeek from "./util/addoneweek"

const main = async () => {
    await addOneWeek(swimProgram, ProgramLevel.ADVANCED)
}

main () 
