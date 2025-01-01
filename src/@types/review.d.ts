import { OrderItem, Product, ProductReview } from "@prisma/client";

interface IProductToUserReview extends OrderItem {
  product: Product
  purchaseAt: Date;
  productReview: ProductReview
}