-- CreateEnum
CREATE TYPE "CouponDiscountType" AS ENUM ('CASH', 'PERCENTAGE');

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "discount_type" "CouponDiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "expiresIn" TIMESTAMP(3),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_coupons" (
    "id" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_slug_key" ON "coupons"("slug");

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
