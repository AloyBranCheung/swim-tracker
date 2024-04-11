/*
  Warnings:

  - You are about to drop the `_JourneyToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_JourneyToUser" DROP CONSTRAINT "_JourneyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_JourneyToUser" DROP CONSTRAINT "_JourneyToUser_B_fkey";

-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_JourneyToUser";

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
