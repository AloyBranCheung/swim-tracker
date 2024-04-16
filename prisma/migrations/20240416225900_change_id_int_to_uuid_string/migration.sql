/*
  Warnings:

  - The primary key for the `Journey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StatusPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SwimCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SwimExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSwimActivityLog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_currActiveProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_swimCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_userId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_swimCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "StatusPost" DROP CONSTRAINT "StatusPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "SwimExercise" DROP CONSTRAINT "SwimExercise_programId_fkey";

-- DropForeignKey
ALTER TABLE "UserSwimActivityLog" DROP CONSTRAINT "UserSwimActivityLog_userId_fkey";

-- AlterTable
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "currActiveProgramId" SET DATA TYPE TEXT,
ALTER COLUMN "swimCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Journey_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Journey_id_seq";

-- AlterTable
ALTER TABLE "Program" DROP CONSTRAINT "Program_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "swimCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Program_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Program_id_seq";

-- AlterTable
ALTER TABLE "StatusPost" DROP CONSTRAINT "StatusPost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StatusPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StatusPost_id_seq";

-- AlterTable
ALTER TABLE "SwimCategory" DROP CONSTRAINT "SwimCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SwimCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SwimCategory_id_seq";

-- AlterTable
ALTER TABLE "SwimExercise" DROP CONSTRAINT "SwimExercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "programId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SwimExercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SwimExercise_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserSwimActivityLog" DROP CONSTRAINT "UserSwimActivityLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserSwimActivityLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserSwimActivityLog_id_seq";

-- AddForeignKey
ALTER TABLE "StatusPost" ADD CONSTRAINT "StatusPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwimExercise" ADD CONSTRAINT "SwimExercise_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_currActiveProgramId_fkey" FOREIGN KEY ("currActiveProgramId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSwimActivityLog" ADD CONSTRAINT "UserSwimActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
