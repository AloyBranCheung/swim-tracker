/*
  Warnings:

  - Added the required column `timeRepLastCompleted` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "timeRepLastCompleted" TIMESTAMP(3) NOT NULL;
