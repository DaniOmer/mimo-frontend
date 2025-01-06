import { IUser } from "../user/user.types";
import { IProduct, IProductVariant } from "../product/product.types";

export interface CartItemCreateDTO {
  productId: string;
  productVariantId?: string;
  quantity: number;
}

export interface CartItemUpdateDTO {
  cartId: string;
  productId: string;
  productVariantId?: string;
  quantity: number;
}

export interface ICart {
  _id: string;
  user: string | IUser;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  _id: string;
  product: string | IProduct;
  productVariant: string | IProductVariant;
  cart: string | ICart;
  priceEtx: number;
  priceVat: number;
  quantity: number;
  subTotalEtx: number;
  subTotalVat: number;
}
