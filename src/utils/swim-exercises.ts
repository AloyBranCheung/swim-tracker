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

        const exerciseArray = exerciseMap.get(exercise.exerciseType);
        exerciseArray.push(exercise);

    }
    return { exerciseMap, totalDistance, unit };
}

export default orderSwimExercises