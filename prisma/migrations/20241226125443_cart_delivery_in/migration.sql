/*
  Warnings:

  - Added the required column `delivery_in` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "delivery_in" TEXT NOT NULL;
