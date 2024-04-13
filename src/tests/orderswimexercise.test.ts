import { describe, expect, it } from "vitest";
// function
import orderSwimExercises, { calculateTotalDistanceSwam } from "@/utils/swim-exercises";
import { SwimExercise } from "@prisma/client";

const date = new Date();


const swimExercises: SwimExercise[] = [
    {
        "id": 1,
        "exerciseType": "WARMUP",
        "sets": 4,
        "distance": 25,
        "unit": "m",
        "accessory": null,
        "notes": "take it easy man",
        "createdAt": date,
        "updatedAt": date,
        "programId": 1
    },
    {
        "id": 2,
        "exerciseType": "MAINSET",
        "sets": 8,
        "distance": 25,
        "unit": "m",
        "accessory": "FINS",
        "notes": null,
        "createdAt": date,
        "updatedAt": date,
        "programId": 1
    },
    {
        "id": 5,
        "exerciseType": "COOLDOWN",
        "sets": 2,
        "distance": 25,
        "unit": "m",
        "accessory": null,
        "notes": "take a chill pill",
        "createdAt": date,
        "updatedAt": date,
        "programId": 1
    }
]

describe("test process swim exercise", () => {
    it("should convert datastructure", () => {
        const result = orderSwimExercises(swimExercises)

        expect(result.exerciseMap.get('WARMUP')).toEqual([swimExercises[0]]);
        expect(result.exerciseMap.get('MAINSET')).toEqual([swimExercises[1]]);
        expect(result.exerciseMap.get('COOLDOWN')).toEqual([swimExercises[2]]);
        expect(result.totalDistance).toBe(350)
        expect(result.unit).toBe('m')
    })
    it("should calculate total distance swam", () => {
        const total = calculateTotalDistanceSwam(swimExercises)

        expect(total).toBe(350)
    })
})