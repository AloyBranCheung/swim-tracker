-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_currActiveProgramId_fkey";

-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_swimCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_swimCategoryId_fkey" FOREIGN KEY ("swimCategoryId") REFERENCES "SwimCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_currActiveProgramId_fkey" FOREIGN KEY ("currActiveProgramId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
