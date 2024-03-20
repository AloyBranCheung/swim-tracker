/*
  Warnings:

  - Added the required column `unit` to the `SwimExercise` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `distance` on the `SwimExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SwimExercise" ADD COLUMN     "unit" "Unit" NOT NULL,
DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER NOT NULL;
