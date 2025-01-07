import { IAddress } from "../address/address.types";
import { IUser } from "../user/user.types";

export enum OrderStatus {
  Pending = "pending",
  Completed = "completed",
  Shipped = "shipped",
  Delivered = "delivered",
  Canceled = "canceled",
}

export interface IOrder {
  _id: string ;
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
