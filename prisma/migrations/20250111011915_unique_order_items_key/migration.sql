/*
  Warnings:

  - A unique constraint covering the columns `[cart_id,product_model_id,product_size_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id,product_model_id,product_size_id]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_items_product_model_id_product_size_id_key";

-- DropIndex
DROP INDEX "order_items_product_id_order_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_product_model_id_product_size_id_key" ON "cart_items"("cart_id", "product_model_id", "product_size_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_id_product_model_id_product_size_id_key" ON "order_items"("order_id", "product_model_id", "product_size_id");
