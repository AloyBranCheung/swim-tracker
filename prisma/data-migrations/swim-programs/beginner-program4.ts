import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 4", 4)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Think about long strong gliding arm strokes.",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Focus on keeping abs tight and kicking from the hip."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Think about strong kicks with feet turned out."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Focus on keeping abs tight and kicking from the hip."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "Use your kick only to move through the water.",
        accessory: Accessory.KICKBOARD
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "chill vibes only"
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER) // add this line once all exercises are added
    .build();
