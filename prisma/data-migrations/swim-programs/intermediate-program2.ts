import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 2", 2)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 1,
        distance: 100,
        unit: "m",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 2,
        distance: 50,
        unit: "m",
        notes: "rest 15sec/50m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 50,
        unit: 'm',
        notes: "moderate pace. rest 20 sec/50m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 1,
        distance: 200,
        unit: 'm',
        notes: 'steady'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 50,
        unit: 'm',
        notes: "moderate pace. rest 20 sec/50m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 50,
        unit: 'm',
        notes: 'chill vibes only'
    })
    .addProgramToSwimProgram(ProgramLevel.INTERMEDIATE) // add this line once all exercises are added
    .build();
