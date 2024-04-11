/*
  Warnings:

  - You are about to drop the column `url` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "url";

-- AlterTable
ALTER TABLE "SwimCategory" ADD COLUMN     "url" TEXT NOT NULL DEFAULT '';
