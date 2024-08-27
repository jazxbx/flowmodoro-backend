/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Goal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Goal_date_key";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "createdAt";
ALTER TABLE "Goal" DROP COLUMN "updatedAt";
ALTER TABLE "Goal" ADD COLUMN     "goalComplete" TIMESTAMP(3);
ALTER TABLE "Goal" ADD COLUMN     "goalStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
