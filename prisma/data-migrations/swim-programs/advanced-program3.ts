import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 3", 3)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 1,
        distance: 100,
        unit: "m",
        notes: "chill",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: 'm',
        notes: "chill,rest as needed"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 1,
        distance: 200,
        unit: 'm',
        notes: 'moderate. rest 30 sec.'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 1,
        distance: 100,
        unit: 'm',
        notes: 'moderate. rest 20sec.'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 2,
        distance: 50,
        unit: 'm',
        notes: 'moderate. rest 15sec./50m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        unit: 'm',
        notes: 'fast/hard. rest 10 sec./25m'
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.COOLDOWN,
        sets: 1,
        distance: 200,
        unit: 'm',
        notes: 'chill vibes only '
    })
    .addProgramToSwimProgram(ProgramLevel.ADVANCED) // add this line once all exercises are added
    .build();
