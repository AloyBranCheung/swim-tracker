import { ProgramLevel } from "@prisma/client"
// swim program
import {swimProgram} from "./swim-programs/intermediate-program3"
// utils
import addOneWeek from "./util/addoneweek"

const main = async () => {
    await addOneWeek(swimProgram, ProgramLevel.INTERMEDIATE)
}

main () 
