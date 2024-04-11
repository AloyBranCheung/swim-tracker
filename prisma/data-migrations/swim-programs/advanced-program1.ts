import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 1", 1)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 2,
        distance: 100,
        unit: "m",
        notes: "takes it easy man",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: 'm',
        notes: "Steady, Take 15 secs rest in between each one."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 8,
        distance: 50,
        unit: 'm',
        notes: "Moderate effort, Take 20 secs rest in between each one."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 100,
        unit: 'm',
        notes: "chill time"
    })
    .addProgramToSwimProgram(ProgramLevel.ADVANCED)
    .build();
