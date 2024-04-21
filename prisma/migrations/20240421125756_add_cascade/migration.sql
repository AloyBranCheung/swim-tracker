-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_swimCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
