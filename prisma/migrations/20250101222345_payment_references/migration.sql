/*
  Warnings:

  - You are about to drop the column `checkoutId` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentInstitutionOrderId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentInstitutionCheckoutId` to the `checkouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentInstitutionOrderId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_checkoutId_fkey";

-- DropIndex
DROP INDEX "orders_checkoutId_key";

-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "paymentInstitutionCheckoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "checkoutId",
ADD COLUMN     "paymentInstitutionOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_paymentInstitutionOrderId_key" ON "orders"("paymentInstitutionOrderId");
