import { Cart, CartItem, Order, OrderItem, Product, UserAddress } from "@prisma/client";
import { IUserWithInfos } from "./user";

interface ICartDetails extends Cart {
  cartItems: CartItem[]
}

interface IOrderItemsDetails extends OrderItem {
  product: Product;
}

interface IOrderDetails extends Order {
  orderItems: Array<IOrderItemsDetails>;
  userAddress: UserAddress;
  user: IUserWithInfos
  statusText: string;
  paymentTypeText: string;
}