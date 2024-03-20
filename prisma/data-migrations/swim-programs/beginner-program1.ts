import SwimProgramBuilder from "../util/SwimProgramBuilder"
import { ExerciseType, Accessory, ProgramLevel } from "@prisma/client"

// TODO: create a web scraper instead to create a JSON?
export const swimProgram = new SwimProgramBuilder().startBuildingProgram('Program 1').addExerciseToProgram({
    exerciseType: ExerciseType.WARMUP,
    sets: 4,
    distance: 25,
    unit: 'm',
    notes: 'take it easy man',
}).addExerciseToProgram({
    exerciseType: ExerciseType.MAINSET,
    sets: 8,
    distance: 25,
    unit: 'm',
    accessory: Accessory.FINS
}).addExerciseToProgram({
    exerciseType: ExerciseType.MAINSET,
    sets: 3,
    distance: 25,
    unit: 'm',
    accessory: Accessory.KICKBOARD
}).addExerciseToProgram({
    exerciseType: ExerciseType.MAINSET,
    sets: 4,
    distance: 25,
    unit: 'm',
    accessory: Accessory.KICKBOARD
}).addExerciseToProgram({
    exerciseType: ExerciseType.COOLDOWN,
    sets: 2,
    distance: 25,
    unit: 'm',
    notes: 'take a chill pill'
}).addProgramToSwimProgram(ProgramLevel.BEGINNER).build()

