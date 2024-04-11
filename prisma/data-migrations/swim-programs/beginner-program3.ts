import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 3", 3)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: "m",
        notes: "rest 30 sec.",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 8,
        distance: 25,
        unit: 'm',
        accessory: Accessory.KICKBOARD_FINS,
        notes: "Focus on breathing every 3 strokes, however if you feel this challenging, breath every 2 or 4. Moderate pace. Rest 15 seconds after each 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 100,
        accessory: Accessory.PULLBUOY,
        unit: 'm',
        notes: "Steady pace. Rest 30 seconds after each 100m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: 'm',
        notes: 'Moderate pace. Rest 30 seconds after each 25m.'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 50,
        unit: 'm',
        notes: "chill time"
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER)
    .build();
