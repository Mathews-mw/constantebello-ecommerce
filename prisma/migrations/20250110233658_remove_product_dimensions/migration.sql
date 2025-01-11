/*
  Warnings:

  - You are about to drop the column `product_dimension_id` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "product_dimension_id";
