-- CreateTable
CREATE TABLE "customer_favorite_products" (
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_favorite_products_user_id_product_id_key" ON "customer_favorite_products"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "customer_favorite_products" ADD CONSTRAINT "customer_favorite_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_favorite_products" ADD CONSTRAINT "customer_favorite_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
