-- DropForeignKey
ALTER TABLE "Journey" DROP CONSTRAINT "Journey_userId_fkey";

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
