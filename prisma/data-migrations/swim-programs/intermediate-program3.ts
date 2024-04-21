import SwimProgramBuilder from "../util/SwimProgramBuilder";
import { ExerciseType, ProgramLevel } from "@prisma/client";

export const swimProgram = new SwimProgramBuilder()
    .startBuildingProgram("Week 3", 3)
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 1,
        distance: 100,
        unit: "m",
        notes: "chill vibes only",
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.WARMUP,
        sets: 4,
        distance: 50,
        unit: 'm',
        notes: "steady. rest 15 sec./50m"
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 100,
        unit: 'm',
        notes: "moderate. 30 sec. rest/100m"
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
