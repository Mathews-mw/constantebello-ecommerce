/*
  Warnings:

  - A unique constraint covering the columns `[product_model_id,product_size_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_items_cart_id_product_model_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_product_model_id_product_size_id_key" ON "cart_items"("product_model_id", "product_size_id");
