import { SwimExercise, ExerciseType } from "@prisma/client";

const orderSwimExercises = (swimExercises: SwimExercise[]) => {
    let totalDistance = 0;
    let unit: string = "";
    const exerciseMap = new Map()
    exerciseMap.set(ExerciseType.WARMUP, [])
    exerciseMap.set(ExerciseType.MAINSET, [])
    exerciseMap.set(ExerciseType.COOLDOWN, [])

    for (const exercise of swimExercises) {
        unit = exercise.unit;
        totalDistance += exercise.distance * exercise.sets;

        // the array is a reference (Javascript tings)
        const exerciseArray = exerciseMap.get(exercise.exerciseType);
        exerciseArray.push(exercise);
    }
    return { exerciseMap, totalDistance, unit };
}

export default orderSwimExercises

export const calculateTotalDistanceSwam = (swimExercises: SwimExercise[]) => {
    let total = 0;
    for (const exercise of swimExercises) {
        total += exercise.distance * exercise.sets;
    }
    return total
}