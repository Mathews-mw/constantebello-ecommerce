/*
  Warnings:

  - A unique constraint covering the columns `[order_item_id]` on the table `product_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_reviews_order_item_id_key" ON "product_reviews"("order_item_id");
