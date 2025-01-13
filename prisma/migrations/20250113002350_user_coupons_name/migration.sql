/*
  Warnings:

  - You are about to drop the column `couponId` on the `users_coupons` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_coupons` table. All the data in the column will be lost.
  - Added the required column `coupon_id` to the `users_coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users_coupons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_coupons" DROP CONSTRAINT "users_coupons_couponId_fkey";

-- DropForeignKey
ALTER TABLE "users_coupons" DROP CONSTRAINT "users_coupons_userId_fkey";

-- AlterTable
ALTER TABLE "users_coupons" DROP COLUMN "couponId",
DROP COLUMN "userId",
ADD COLUMN     "coupon_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
