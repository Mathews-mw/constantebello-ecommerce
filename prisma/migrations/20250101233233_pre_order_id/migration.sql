/*
  Warnings:

  - Added the required column `pre_order_id` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "pre_order_id" TEXT NOT NULL;
