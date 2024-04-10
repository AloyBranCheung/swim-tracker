/*
  Warnings:

  - You are about to drop the `_JourneyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JourneyToUser" DROP CONSTRAINT "_JourneyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_JourneyToUser" DROP CONSTRAINT "_JourneyToUser_B_fkey";

-- DropTable
DROP TABLE "_JourneyToUser";

-- CreateTable
CREATE TABLE "UserOnJourney" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "journeyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOnJourney_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnJourney" ADD CONSTRAINT "UserOnJourney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnJourney" ADD CONSTRAINT "UserOnJourney_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
