import { IUser } from "../user/user.types";

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
  Refunded = "refunded",
}

export interface IPayment {
  _id: string;
  user: string | IUser;
  paymentMethod: string | IPaymentMethod;
  amount: number;
  currency: "usd" | "eur";
  status: PaymentStatus;
  metadata: any;
}

export type IPaymentIntent = {
  amount: number;
  currency: "usd" | "eur";
  customer?: string;
  paymentMethod?: string;
  receiptEmail?: string;
};

export interface IPaymentMethod {
  customer?: string;
  provider: string;
  providerPaymentMethodId: string;
  isDefault: boolean;
}
