import type { Product, ProductDetail } from "@prisma/client";

interface IProductDetails extends Product {
  productDetails: ProductDetail[]
}