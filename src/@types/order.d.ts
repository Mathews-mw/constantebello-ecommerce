import { Cart, CartItem, Order, OrderItem, Product, ProductSize, UserAddress } from "@prisma/client";

import { IUserWithInfos } from "./user";
import { IProductModelDetails } from "./product";

interface ICartDetails extends Cart {
  cartItems: CartItem[]
}

interface IOrderItemsDetails extends OrderItem {
  product: Product;
  productModel: IProductModelDetails
  productSize: ProductSize
}

interface IOrderDetails extends Order {
  orderItems: Array<IOrderItemsDetails>;
  userAddress: UserAddress;
  user: IUserWithInfos
  statusText: string;
  paymentTypeText: string;
}