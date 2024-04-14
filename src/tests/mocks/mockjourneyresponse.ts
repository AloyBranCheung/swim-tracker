// mock journey response from db
import { Prisma } from "@prisma/client"
const mockJourney: Prisma.JourneyGetPayload<{
    include: {
        program: {
            include: {
                swimExercise: true,
            }
        },
        swimCategory: true,
    }
}> = {
    id: 4,
    isActive: true,
    isCompleted: false,
    completedProgramIds: [],
    currActiveProgramRep: 0,
    timeRepLastCompleted: new Date('2024-04-12T16:46:19.538Z'),
    createdAt: new Date('2024-04-14T16:46:19.540Z'),
    updatedAt: new Date('2024-04-14T16:46:19.540Z'),
    swimCategoryId: 1,
    currActiveProgramId: 1,
    userId: 2,
    swimCategory: {
        id: 1,
        category: 'BEGINNER',
        descriptions: [
            "I'm getting back into it",
            'I want to build some swim stamina and skills',
            'Starting from 500m'
        ],
        url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        createdAt: new Date('2024-04-13T19:54:22.671Z'),
        updatedAt: new Date('2024-04-13T19:54:25.059Z'),
        // @ts-expect-error - this is the actual response 
        programs: [
            {
                id: 1,
                name: 'Week 1',
                order: 1,
                reps: 2,
                createdAt: new Date('2024-04-13T19:54:22.700Z'),
                updatedAt: new Date('2024-04-13T19:54:22.700Z'),
                swimCategoryId: 1,
                swimExercise: [
                    {
                        id: 1,
                        exerciseType: 'WARMUP',
                        sets: 4,
                        distance: 25,
                        unit: 'm',
                        accessory: null,
                        notes: 'take it easy man',
                        createdAt: new Date('2024-04-13T19:54:22.709Z'),
                        updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                        programId: 1
                    },
                    {
                        id: 2,
                        exerciseType: 'MAINSET',
                        sets: 8,
                        distance: 25,
                        unit: 'm',
                        accessory: 'FINS',
                        notes: null,
                        createdAt: new Date('2024-04-13T19:54:22.709Z'),
                        updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                        programId: 1
                    },
                    {
                        id: 3,
                        exerciseType: 'MAINSET',
                        sets: 3,
                        distance: 25,
                        unit: 'm',
                        accessory: 'KICKBOARD',
                        notes: null,
                        createdAt: new Date('2024-04-13T19:54:22.709Z'),
                        updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                        programId: 1
                    },
                    {
                        id: 4,
                        exerciseType: 'MAINSET',
                        sets: 4,
                        distance: 25,
                        unit: 'm',
                        accessory: 'KICKBOARD',
                        notes: null,
                        createdAt: new Date('2024-04-13T19:54:22.709Z'),
                        updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                        programId: 1
                    },
                    {
                        id: 5,
                        exerciseType: 'COOLDOWN',
                        sets: 2,
                        distance: 25,
                        unit: 'm',
                        accessory: null,
                        notes: 'take a chill pill',
                        createdAt: new Date('2024-04-13T19:54:22.709Z'),
                        updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                        programId: 1
                    }
                ]
            },
            {
                id: 4,
                name: 'Week 2',
                order: 2,
                reps: 2,
                createdAt: new Date('2024-04-13T19:54:32.223Z'),
                updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                swimCategoryId: 1,
                swimExercise: [
                    {
                        id: 14,
                        exerciseType: 'WARMUP',
                        sets: 4,
                        distance: 25,
                        unit: 'm',
                        accessory: null,
                        notes: 'takes it easy man',
                        createdAt: new Date('2024-04-13T19:54:32.223Z'),
                        updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                        programId: 4
                    },
                    {
                        id: 15,
                        exerciseType: 'MAINSET',
                        sets: 8,
                        distance: 25,
                        unit: 'm',
                        accessory: 'FINS',
                        notes: 'Rest 20 seconds every 25m.',
                        createdAt: new Date('2024-04-13T19:54:32.223Z'),
                        updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                        programId: 4
                    },
                    {
                        id: 16,
                        exerciseType: 'MAINSET',
                        sets: 3,
                        distance: 25,
                        unit: 'm',
                        accessory: 'PULLBUOY',
                        notes: 'Rest 20 seconds after each 25m.',
                        createdAt: new Date('2024-04-13T19:54:32.223Z'),
                        updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                        programId: 4
                    },
                    {
                        id: 17,
                        exerciseType: 'MAINSET',
                        sets: 4,
                        distance: 25,
                        unit: 'm',
                        accessory: 'KICKBOARD',
                        notes: 'Rest 20 seconds after each 25m.',
                        createdAt: new Date('2024-04-13T19:54:32.223Z'),
                        updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                        programId: 4
                    },
                    {
                        id: 18,
                        exerciseType: 'COOLDOWN',
                        sets: 2,
                        distance: 25,
                        unit: 'm',
                        accessory: null,
                        notes: 'chill time',
                        createdAt: new Date('2024-04-13T19:54:32.223Z'),
                        updatedAt: new Date('2024-04-13T19:54:32.223Z'),
                        programId: 4
                    }
                ]
            },
            {
                id: 5,
                name: 'Week 3',
                order: 3,
                reps: 2,
                createdAt: new Date('2024-04-13T19:54:34.652Z'),
                updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                swimCategoryId: 1,
                swimExercise: [
                    {
                        id: 19,
                        exerciseType: 'WARMUP',
                        sets: 4,
                        distance: 50,
                        unit: 'm',
                        accessory: null,
                        notes: 'rest 30 sec.',
                        createdAt: new Date('2024-04-13T19:54:34.652Z'),
                        updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                        programId: 5
                    },
                    {
                        id: 20,
                        exerciseType: 'MAINSET',
                        sets: 8,
                        distance: 25,
                        unit: 'm',
                        accessory: 'KICKBOARD_FINS',
                        notes: 'Focus on breathing every 3 strokes, however if you feel this challenging, breath every 2 or 4. Moderate pace. Rest 15 seconds after each 25m.',
                        createdAt: new Date('2024-04-13T19:54:34.652Z'),
                        updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                        programId: 5
                    },
                    {
                        id: 21,
                        exerciseType: 'MAINSET',
                        sets: 2,
                        distance: 100,
                        unit: 'm',
                        accessory: 'PULLBUOY',
                        notes: 'Steady pace. Rest 30 seconds after each 100m.',
                        createdAt: new Date('2024-04-13T19:54:34.652Z'),
                        updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                        programId: 5
                    },
                    {
                        id: 22,
                        exerciseType: 'MAINSET',
                        sets: 4,
                        distance: 25,
                        unit: 'm',
                        accessory: null,
                        notes: 'Moderate pace. Rest 30 seconds after each 25m.',
                        createdAt: new Date('2024-04-13T19:54:34.652Z'),
                        updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                        programId: 5
                    },
                    {
                        id: 23,
                        exerciseType: 'COOLDOWN',
                        sets: 1,
                        distance: 50,
                        unit: 'm',
                        accessory: null,
                        notes: 'chill time',
                        createdAt: new Date('2024-04-13T19:54:34.652Z'),
                        updatedAt: new Date('2024-04-13T19:54:34.652Z'),
                        programId: 5
                    }
                ]
            }
        ]
    }
}

export default mockJourney