import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { Accessory, ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 6", 6)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 8,
        distance: 25,
        unit: "m",
        notes: "rest 20 sec. per 25m",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: 'm',
        accessory: Accessory.KICKBOARD,
        notes: "rest 20 sec. per 25m",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 6,
        distance: 25,
        unit: 'm',
        accessory: Accessory.PULLBUOY,
        notes: "rest 20 sec. per 25m",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 25,
        unit: 'm',
        notes: "face pace, rest 30 sec. per 25m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 4,
        distance: 25,
        unit: 'm',
        notes: 'chill vibes only'
    })
    .addProgramToSwimProgram(ProgramLevel.BEGINNER) // add this line once all exercises are added
    .build();
