import { Prisma } from "@prisma/client"

const mockCurrJourneyResponse: Prisma.JourneyGetPayload<{
    include: {
        program: {
            include: {
                swimExercise: true,
            }
        },
        swimCategory: true,
    }
}> = {
    id: "4",
    isActive: true,
    isCompleted: false,
    completedProgramIds: [],
    currActiveProgramRep: 0,
    timeRepLastCompleted: new Date('2024-04-12T16:46:19.538Z'),
    createdAt: new Date('2024-04-14T16:46:19.540Z'),
    updatedAt: new Date('2024-04-14T16:46:19.540Z'),
    swimCategoryId: "1",
    currActiveProgramId: "1",
    userId: "2",
    program: {
        id: "1",
        name: 'Week 1',
        order: 1,
        reps: 2,
        createdAt: new Date('2024-04-13T19:54:22.700Z'),
        updatedAt: new Date('2024-04-13T19:54:22.700Z'),
        swimCategoryId: "1",
        swimExercise: [
            {
                id: "1",
                exerciseType: 'WARMUP',
                sets: 4,
                distance: 25,
                unit: 'm',
                accessory: null,
                notes: 'take it easy man',
                createdAt: new Date('2024-04-13T19:54:22.709Z'),
                updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                programId: '1'
            },
            {
                id: "2",
                exerciseType: 'MAINSET',
                sets: 8,
                distance: 25,
                unit: 'm',
                accessory: 'FINS',
                notes: null,
                createdAt: new Date('2024-04-13T19:54:22.709Z'),
                updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                programId: '1'
            },
            {
                id: "3",
                exerciseType: 'MAINSET',
                sets: 3,
                distance: 25,
                unit: 'm',
                accessory: 'KICKBOARD',
                notes: null,
                createdAt: new Date('2024-04-13T19:54:22.709Z'),
                updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                programId: '1'
            },
            {
                id: "4",
                exerciseType: 'MAINSET',
                sets: 4,
                distance: 25,
                unit: 'm',
                accessory: 'KICKBOARD',
                notes: null,
                createdAt: new Date('2024-04-13T19:54:22.709Z'),
                updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                programId: '1'
            },
            {
                id: "5",
                exerciseType: 'COOLDOWN',
                sets: 2,
                distance: 25,
                unit: 'm',
                accessory: null,
                notes: 'take a chill pill',
                createdAt: new Date('2024-04-13T19:54:22.709Z'),
                updatedAt: new Date('2024-04-13T19:54:22.709Z'),
                programId: '1'
            }
        ]
    },
    swimCategory: {
        id: "1",
        category: 'BEGINNER',
        descriptions: [
            "I'm getting back into it",
            'I want to build some swim stamina and skills',
            'Starting from 500m'
        ],
        url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        createdAt: new Date('2024-04-13T19:54:22.671Z'),
        updatedAt: new Date('2024-04-13T19:54:25.059Z')
    }
}

export default mockCurrJourneyResponse