/*
  Warnings:

  - You are about to drop the column `singleUse` on the `coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "singleUse",
ADD COLUMN     "single_use" BOOLEAN NOT NULL DEFAULT false;
