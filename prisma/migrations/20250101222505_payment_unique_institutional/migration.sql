/*
  Warnings:

  - You are about to drop the column `paymentInstitutionCheckoutId` on the `checkouts` table. All the data in the column will be lost.
  - You are about to drop the column `paymentInstitutionOrderId` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_institution_checkout_id]` on the table `checkouts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_institution_order_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_institution_checkout_id` to the `checkouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_institution_order_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orders_paymentInstitutionOrderId_key";

-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "paymentInstitutionCheckoutId",
ADD COLUMN     "payment_institution_checkout_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentInstitutionOrderId",
ADD COLUMN     "payment_institution_order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "checkouts_payment_institution_checkout_id_key" ON "checkouts"("payment_institution_checkout_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_institution_order_id_key" ON "orders"("payment_institution_order_id");
