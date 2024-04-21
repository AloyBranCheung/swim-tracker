import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 4", 4)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 1,
        distance: 100,
        unit: "m",
        notes: "chill vibes",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 25,
        unit: "m",
        notes: "moderate. rest 20 sec./25m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 150,
        unit: 'm',
        notes: "moderate. rest 30 sec./150m"
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
