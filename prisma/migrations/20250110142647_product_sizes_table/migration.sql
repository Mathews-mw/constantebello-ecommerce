/*
  Warnings:

  - You are about to drop the column `height` on the `product_models` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `product_models` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `product_models` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `product_models` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_models" DROP COLUMN "height",
DROP COLUMN "length",
DROP COLUMN "weight",
DROP COLUMN "width";

-- CreateTable
CREATE TABLE "product_sizes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_model_id" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_product_model_id_fkey" FOREIGN KEY ("product_model_id") REFERENCES "product_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
