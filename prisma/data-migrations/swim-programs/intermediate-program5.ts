import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 5", 5)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: "m",
        notes: "easy",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 6,
        distance: 25,
        unit: 'm',
        notes: 'rest 15sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: 'fast. rest 20sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 50,
        unit: 'm',
        accessory: Accessory.PULLBUOY,
        notes: 'rest 15sec./50m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: 'fast. rest 20sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 50,
        unit: 'm',
        accessory: Accessory.PULLBUOY,
        notes: 'rest 15sec./50m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: 'fast. rest 20sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 250,
        unit: 'm',
        notes: 'chill vibes only'
    })
    .addProgramToSwimProgram(ProgramLevel.INTERMEDIATE) // add this line once all exercises are added
    .build();
