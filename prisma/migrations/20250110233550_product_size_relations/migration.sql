/*
  Warnings:

  - You are about to drop the column `product_dimension_id` on the `cart_items` table. All the data in the column will be lost.
  - Added the required column `product_size_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_size_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "product_dimension_id",
ADD COLUMN     "product_size_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "product_size_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_size_id_fkey" FOREIGN KEY ("product_size_id") REFERENCES "product_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_size_id_fkey" FOREIGN KEY ("product_size_id") REFERENCES "product_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
