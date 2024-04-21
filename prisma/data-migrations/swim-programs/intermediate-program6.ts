import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 6", 6)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 2,
        distance: 50,
        unit: "m",
        notes: "easy. rest 20sec./50m",
        accessory: Accessory.PULLBUOY
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 8,
        distance: 25,
        unit: 'm',
        notes: "moderate. rest 20sec./25m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 150,
        unit: 'm',
        notes: "moderate. rest 30sec./150mm"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 100,
        unit: 'm',
        notes: 'chill vibes only'
    })
    .addProgramToSwimProgram(ProgramLevel.INTERMEDIATE) // add this line once all exercises are added
    .build();
