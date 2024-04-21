import { ProgramLevel } from "@prisma/client"
// swim program
import {swimProgram} from "./swim-programs/intermediate-program6"
// utils
import addOneWeek from "./util/addoneweek"

const main = async () => {
    await addOneWeek(swimProgram, ProgramLevel.INTERMEDIATE)
}

main () 
