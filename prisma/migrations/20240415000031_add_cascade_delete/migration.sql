-- DropForeignKey
ALTER TABLE "UserSwimActivityLog" DROP CONSTRAINT "UserSwimActivityLog_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserSwimActivityLog" ADD CONSTRAINT "UserSwimActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
