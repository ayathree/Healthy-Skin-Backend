/*
  Warnings:

  - You are about to drop the column `endDate` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `schedules` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_schedule_endDate";

-- DropIndex
DROP INDEX "idx_schedule_startDate";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_schedule_startDate" ON "schedules"("startDateTime");

-- CreateIndex
CREATE INDEX "idx_schedule_endDate" ON "schedules"("endDateTime");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
