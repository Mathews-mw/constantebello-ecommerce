/*
  Warnings:

  - You are about to drop the column `product_detail_id` on the `product_images` table. All the data in the column will be lost.
  - Added the required column `product_model_id` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_detail_id_fkey";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "product_detail_id",
ADD COLUMN     "product_model_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_model_id_fkey" FOREIGN KEY ("product_model_id") REFERENCES "product_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
