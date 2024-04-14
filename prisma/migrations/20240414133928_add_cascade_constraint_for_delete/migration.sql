-- DropForeignKey
ALTER TABLE "SwimExercise" DROP CONSTRAINT "SwimExercise_programId_fkey";

-- AddForeignKey
ALTER TABLE "SwimExercise" ADD CONSTRAINT "SwimExercise_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
