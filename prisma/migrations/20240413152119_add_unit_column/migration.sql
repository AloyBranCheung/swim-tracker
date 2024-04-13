/*
  Warnings:

  - Added the required column `unit` to the `UserSwimActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSwimActivityLog" ADD COLUMN     "unit" "Unit" NOT NULL;
