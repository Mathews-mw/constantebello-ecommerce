/*
  Warnings:

  - Added the required column `delivery_fee` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_fee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;
