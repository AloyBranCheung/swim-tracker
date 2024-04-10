/*
  Warnings:

  - You are about to drop the column `userId` on the `Journey` table. All the data in the column will be lost.
  - You are about to drop the `JourneySwimCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currActiveProgramId` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `swimCategoryId` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_userId_fkey";

-- DropForeignKey
ALTER TABLE "JourneySwimCategory" DROP CONSTRAINT "JourneySwimCategory_journeyId_fkey";

-- DropForeignKey
ALTER TABLE "JourneySwimCategory" DROP CONSTRAINT "JourneySwimCategory_swimCategoryId_fkey";

-- AlterTable
ALTER TABLE "Journey" DROP COLUMN "userId",
ADD COLUMN     "completedProgramIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "currActiveProgramId" INTEGER NOT NULL,
ADD COLUMN     "swimCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "JourneySwimCategory";

-- CreateTable
CREATE TABLE "_JourneyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JourneyToUser_AB_unique" ON "_JourneyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_JourneyToUser_B_index" ON "_JourneyToUser"("B");

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_currActiveProgramId_fkey" FOREIGN KEY ("currActiveProgramId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
