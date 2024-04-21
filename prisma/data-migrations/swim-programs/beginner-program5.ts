import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 5", 5)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "easy pace",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 8,
        distance: 25,
        unit: "m",
        notes: "Rest 20 seconds every 25m.",
        accessory: Accessory.FINS
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 3,
        distance: 25,
        unit: "m",
        notes: "Rest 20 seconds after each 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Rest 20 seconds after each 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: 'chill vibes only '
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER) // add this line once all exercises are added
    .build();
