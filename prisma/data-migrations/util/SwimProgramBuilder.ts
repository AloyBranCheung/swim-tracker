/* eslint-disable @typescript-eslint/no-var-requires */
import { ExerciseType, Accessory, ProgramLevel } from '@prisma/client'

interface Exercise {
    exerciseType: ExerciseType;
    sets: number;
    distance: number;
    unit: 'm';
    accessory?: Accessory;
    notes?: string;
}

interface Program {
    programName: string,
    exercises: Exercise[]
    order: number;
}

export type WorkoutSession = {
    [key in ProgramLevel]: Program[];
};

class SwimProgramBuilder {
    private swimProgram: WorkoutSession
    private program: Program

    constructor() {
        this.swimProgram = {
            [ProgramLevel.BEGINNER]: [],
            [ProgramLevel.INTERMEDIATE]: [],
            [ProgramLevel.ADVANCED]: []
        }
        this.program = {
            programName: '',
            exercises: [],
            order: 1
        }
    }

    private resetProgram() {
        this.program = {
            programName: '',
            exercises: [],
            order: 1
        }
    }

    public startBuildingProgram(programName: string, order: number) {
        this.program = {
            programName,
            exercises: [],
            order: order
        }
        return this
    }

    public addExerciseToProgram(exercise: Exercise) {
        this.program.exercises.push(exercise)
        return this
    }

    public addProgramToSwimProgram(category: ProgramLevel) {
        this.swimProgram[category].push(this.program)
        this.resetProgram();
        return this
    }

    public build() {
        return this.swimProgram
    }
}

export default SwimProgramBuilder

