-- CreateEnum
CREATE TYPE "ProgramLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('WARMUP', 'COOLDOWN', 'MAINSET');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('m');

-- CreateEnum
CREATE TYPE "Accessory" AS ENUM ('FINS', 'PULLBUOY', 'KICKBOARD');

-- CreateTable
CREATE TABLE "SwimCategory" (
    "id" SERIAL NOT NULL,
    "category" "ProgramLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SwimCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "swimCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwimExercise" (
    "id" SERIAL NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "sets" INTEGER NOT NULL,
    "distance" "Unit" NOT NULL,
    "accessory" "Accessory",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "SwimExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwimExercise" ADD CONSTRAINT "SwimExercise_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
