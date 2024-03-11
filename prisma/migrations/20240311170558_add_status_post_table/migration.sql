-- CreateTable
CREATE TABLE "StatusPost" (
    "id" SERIAL NOT NULL,
    "msg" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StatusPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusPost" ADD CONSTRAINT "StatusPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
