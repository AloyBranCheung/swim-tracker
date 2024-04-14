-- DropForeignKey
ALTER TABLE "StatusPost" DROP CONSTRAINT "StatusPost_userId_fkey";

-- AddForeignKey
ALTER TABLE "StatusPost" ADD CONSTRAINT "StatusPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
