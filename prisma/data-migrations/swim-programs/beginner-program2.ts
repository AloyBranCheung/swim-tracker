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
        notes: "With Fins. Fins will allow you move through the water easier. Try and focus on switching your core on for better positioning and technique. Rest 20 seconds every 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 3,
        distance: 25,
        accessory: Accessory.PULLBUOY,
        unit: 'm',
        notes: "With Pull Buoy. The Pull Buoy will ensure you focus on your upper body stroke. Lead with your fingertips, then hands over the elbow when you pull through the water. Try not to drop your elbow. Rest 20 seconds after each 25m."
    })
    .addExerciseToProgram({
        exerciseType: ExerciseType.MAINSET,
        sets: 4,
        distance: 25,
        accessory: Accessory.KICKBOARD,
        unit: 'm',
        notes: 'With Kickboard. The Kickboard will allow you to focus on your kick. Remember to hold the board from the top and not the sides. As mentioned above, keep you core switched on for strength and try to flick your feet when you kick for better propulsion. Rest 20 seconds after each 25m.'
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
