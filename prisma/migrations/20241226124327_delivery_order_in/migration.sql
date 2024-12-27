/*
  Warnings:

  - Added the required column `delivery_in` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_in" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_in_fkey" FOREIGN KEY ("delivery_in") REFERENCES "user_addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
