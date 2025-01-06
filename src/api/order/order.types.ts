
export enum OrderStatus {
    Pending = "pending",
    Completed = "completed",
    Shipped = "shipped",
    Delivered = "delivered",
    Canceled = "canceled",
  }
  
  export interface IOrder {
    _id: string; 
    user: string;
    number: string; 
    shipDate?: Date; 
    status: OrderStatus; 
    amountEtx: number; 
    amountVat: number; 
    shippingAddress:string
    billingAddress: string;
    createdAt: Date;
    items: IOrderItem[];
  }

  export interface IOrderItem {
    _id: string;
    product: string;
    productVariant: string ;
    order: string ;
    quantity: number;
    priceEtx: number;
    priceVat: number;
    subTotalEtx: number;
    subTotalVat: number;
  }


  