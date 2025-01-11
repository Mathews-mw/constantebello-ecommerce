/*
  Warnings:

  - You are about to drop the column `product_detail_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_detail_id` on the `order_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cart_id,product_model_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_model_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_model_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_detail_id_fkey";

-- DropIndex
DROP INDEX "cart_items_cart_id_product_detail_id_key";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "product_detail_id",
ADD COLUMN     "product_model_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "product_detail_id",
ADD COLUMN     "product_model_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_product_model_id_key" ON "cart_items"("cart_id", "product_model_id");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_model_id_fkey" FOREIGN KEY ("product_model_id") REFERENCES "product_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_model_id_fkey" FOREIGN KEY ("product_model_id") REFERENCES "product_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
