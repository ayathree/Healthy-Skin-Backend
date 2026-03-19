/*
  Warnings:

  - You are about to drop the column `doctorId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `payments` table. All the data in the column will be lost.
  - The `transactionId` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[videoCallingId]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeEventId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `videoCallingId` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_patientId_fkey";

-- DropIndex
DROP INDEX "idx_payment_doctorId";

-- DropIndex
DROP INDEX "idx_payment_patientId";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "videoCallingId",
ADD COLUMN     "videoCallingId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "doctorId",
DROP COLUMN "patientId",
ADD COLUMN     "paymentGatewayData" JSONB,
ADD COLUMN     "stripeEventId" TEXT,
DROP COLUMN "transactionId",
ADD COLUMN     "transactionId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_videoCallingId_key" ON "appointments"("videoCallingId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeEventId_key" ON "payments"("stripeEventId");

-- CreateIndex
CREATE INDEX "idx_payment_transactionId" ON "payments"("transactionId");
