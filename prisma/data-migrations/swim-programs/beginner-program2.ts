import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 2", 2)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "takes it easy man",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 8,
        distance: 25,
        unit: 'm',
        accessory: Accessory.FINS,
        notes: "Rest 20 seconds every 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 3,
        distance: 25,
        accessory: Accessory.PULLBUOY,
        unit: 'm',
        notes: "Rest 20 seconds after each 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        accessory: Accessory.KICKBOARD,
        unit: 'm',
        notes: 'Rest 20 seconds after each 25m.'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: "chill time"
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER)
    .build();
