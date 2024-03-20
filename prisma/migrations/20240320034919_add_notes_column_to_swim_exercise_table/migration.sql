/*
  Warnings:

  - Added the required column `notes` to the `SwimExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SwimExercise" ADD COLUMN     "notes" TEXT NOT NULL;
