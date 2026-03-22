/*
  Warnings:

  - You are about to drop the column `doctorScheduleId` on the `appointments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctorScheduleId_fkey";

-- DropIndex
DROP INDEX "appointments_doctorScheduleId_key";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "doctorScheduleId";
