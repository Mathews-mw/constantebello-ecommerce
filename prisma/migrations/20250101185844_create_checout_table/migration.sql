/*
  Warnings:

  - A unique constraint covering the columns `[checkoutId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `checkoutId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "checkoutId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "checkouts" (
    "id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checkouts_reference_id_key" ON "checkouts"("reference_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_checkoutId_key" ON "orders"("checkoutId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "checkouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
