/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "databaseId" DROP DEFAULT,
ALTER COLUMN "databaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("databaseId");
DROP SEQUENCE "User_databaseId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
