/*
  Warnings:

  - You are about to drop the column `stock_quantity ` on the `product_details` table. All the data in the column will be lost.
  - Added the required column `stock_quantity` to the `product_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_details" DROP COLUMN "stock_quantity ",
ADD COLUMN     "stock_quantity" INTEGER NOT NULL;
