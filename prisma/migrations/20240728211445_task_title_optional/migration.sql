/*
  Warnings:

  - You are about to drop the column `completed` on the `TaskTime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskTime" DROP COLUMN "completed";
