-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "reps" INTEGER NOT NULL DEFAULT 2;

-- CreateTable
CREATE TABLE "UserSwimActivityLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalDistanceSwam" INTEGER NOT NULL,

    CONSTRAINT "UserSwimActivityLog_pkey" PRIMARY KEY ("id")
);
