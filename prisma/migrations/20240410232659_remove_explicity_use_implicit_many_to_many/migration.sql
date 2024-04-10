/*
  Warnings:

  - You are about to drop the `UserOnJourney` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnJourney" DROP CONSTRAINT "UserOnJourney_journeyId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnJourney" DROP CONSTRAINT "UserOnJourney_userId_fkey";

-- DropTable
DROP TABLE "UserOnJourney";

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
ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JourneyToUser" ADD CONSTRAINT "_JourneyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
