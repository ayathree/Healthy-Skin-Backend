/*
  Warnings:

  - You are about to drop the column `address` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `admin` table. All the data in the column will be lost.
  - Made the column `isDeleted` on table `admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "address",
DROP COLUMN "deletedAt",
ALTER COLUMN "isDeleted" SET NOT NULL;
