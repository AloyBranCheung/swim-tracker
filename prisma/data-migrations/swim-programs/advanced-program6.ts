import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 6", 6)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 2,
        distance: 50,
        unit: "m",
        notes: "@20sec./50m",
        accessory: Accessory.PULLBUOY
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: 'm',
        notes: 'moderate @20sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 300,
        unit: "m",
        notes: "50m hard, 250m steady @ 45 sec./300m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 100,
        unit: "m",
        notes: "chill vibes only",
        accessory: Accessory.PULLBUOY
    })
    .addProgramToSwimProgram(ProgramLevel.ADVANCED) // add this line once all exercises are added
    .build();
