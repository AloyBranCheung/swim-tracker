import { ProgramPayload } from "@/containers/journey-page/ProgramsList"

const mockProgramMenu: ProgramPayload = [
    {
        "id": '1',
        "name": "Week 1",
        "order": 1,
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "swimCategoryId": '1',
        'reps': 2,
        "swimExercise": [
            {
                "id": '1',
                "exerciseType": "WARMUP",
                "sets": 4,
                "distance": 25,
                "unit": "m",
                "accessory": null,
                "notes": "take it easy man",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '1'
            },
            {
                "id": '2',
                "exerciseType": "MAINSET",
                "sets": 8,
                "distance": 25,
                "unit": "m",
                "accessory": "FINS",
                "notes": null,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '1'
            },
            {
                "id": '3',
                "exerciseType": "MAINSET",
                "sets": 3,
                "distance": 25,
                "unit": "m",
                "accessory": "KICKBOARD",
                "notes": null,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '1'
            },
            {
                "id": '4',
                "exerciseType": "MAINSET",
                "sets": 4,
                "distance": 25,
                "unit": "m",
                "accessory": "KICKBOARD",
                "notes": null,
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '1'
            },
            {
                "id": '5',
                "exerciseType": "COOLDOWN",
                "sets": 2,
                "distance": 25,
                "unit": "m",
                "accessory": null,
                "notes": "take a chill pill",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '1'
            }
        ]
    },
    {
        "id": '4',
        "name": "Week 2",
        "order": 2,
        "reps": 2,
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "swimCategoryId": '1',
        "swimExercise": [
            {
                "id": '14',
                "exerciseType": "WARMUP",
                "sets": 4,
                "distance": 25,
                "unit": "m",
                "accessory": null,
                "notes": "takes it easy man",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '4'
            },
            {
                "id": '15',
                "exerciseType": "MAINSET",
                "sets": 8,
                "distance": 25,
                "unit": "m",
                "accessory": "FINS",
                "notes": "With Fins. Fins will allow you move through the water easier. Try and focus on switching your core on for better positioning and technique. Rest 20 seconds every 25m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '4'
            },
            {
                "id": '16',
                "exerciseType": "MAINSET",
                "sets": 3,
                "distance": 25,
                "unit": "m",
                "accessory": "PULLBUOY",
                "notes": "With Pull Buoy. The Pull Buoy will ensure you focus on your upper body stroke. Lead with your fingertips, then hands over the elbow when you pull through the water. Try not to drop your elbow. Rest 20 seconds after each 25m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '4'
            },
            {
                "id": '17',
                "exerciseType": "MAINSET",
                "sets": 4,
                "distance": 25,
                "unit": "m",
                "accessory": "KICKBOARD",
                "notes": "With Kickboard. The Kickboard will allow you to focus on your kick. Remember to hold the board from the top and not the sides. As mentioned above, keep you core switched on for strength and try to flick your feet when you kick for better propulsion. Rest 20 seconds after each 25m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '4'
            },
            {
                "id": '18',
                "exerciseType": "COOLDOWN",
                "sets": 2,
                "distance": 25,
                "unit": "m",
                "accessory": null,
                "notes": "chill time",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '4'
            }
        ]
    },
    {
        "id": '5',
        "name": "Week 3",
        "order": 3,
        "reps": 2,
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "swimCategoryId": '1',
        "swimExercise": [
            {
                "id": '19',
                "exerciseType": "WARMUP",
                "sets": 4,
                "distance": 50,
                "unit": "m",
                "accessory": null,
                "notes": "rest 30 sec.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '5'
            },
            {
                "id": '20',
                "exerciseType": "MAINSET",
                "sets": 8,
                "distance": 25,
                "unit": "m",
                "accessory": "KICKBOARD_FINS",
                "notes": "Focus on breathing every 3 strokes, however if you feel this challenging, breath every 2 or 4. Moderate pace. Rest 15 seconds after each 25m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '5'
            },
            {
                "id": '21',
                "exerciseType": "MAINSET",
                "sets": 2,
                "distance": 100,
                "unit": "m",
                "accessory": "PULLBUOY",
                "notes": "Steady pace. Rest 30 seconds after each 100m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '5'
            },
            {
                "id": '22',
                "exerciseType": "MAINSET",
                "sets": 4,
                "distance": 25,
                "unit": "m",
                "accessory": null,
                "notes": "Moderate pace. Rest 30 seconds after each 25m.",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '5'
            },
            {
                "id": '23',
                "exerciseType": "COOLDOWN",
                "sets": 1,
                "distance": 50,
                "unit": "m",
                "accessory": null,
                "notes": "chill time",
                "createdAt": new Date(),
                "updatedAt": new Date(),
                "programId": '5'
            }
        ]
    }
]

export default mockProgramMenu