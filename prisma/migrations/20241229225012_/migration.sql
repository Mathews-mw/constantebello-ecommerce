/*
  Warnings:

  - A unique constraint covering the columns `[user_id,order_item_id]` on the table `product_reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_item_id` to the `product_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_reviews" ADD COLUMN     "order_item_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_reviews_user_id_order_item_id_key" ON "product_reviews"("user_id", "order_item_id");

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
