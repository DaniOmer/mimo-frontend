import { IAddress } from "../address/address.types";
import { IUser } from "../user/user.types";
export enum OrderStatus {
  Pending = "pending",
  Completed = "completed",
  Shipped = "shipped",
  Delivered = "delivered",
  Canceled = "canceled",
}

export interface IOrderItem {
  product: string;
  productVariant: string;
  order: string;
  quantity: number;
  priceEtx: number;
  priceVat: number;
  subTotalEtx: number;
  subTotalVat: number;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  number: string;
  shipDate?: Date;
  status: OrderStatus;
  amountEtx: number;
  amountVat: number;
  shippingAddress: string | IAddress;
  billingAddress: string | IAddress;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminOrderItem {
    productId: string;
    productVariantId?: string;
    quantity: number;
    // priceEtx: number;
    // priceVat: number;
  }
  
  export interface IAdminCreateOrderPayload {
    items: IAdminOrderItem[];
  }
