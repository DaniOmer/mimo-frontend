import { IColor } from "../color/color.types";
import { ISize } from "../size/size.types";
import { IProduct } from "./product.types";

export interface IProductVariant {
  _id: string;
  priceEtx: number;
  priceVat: number;
  stripeId?: string;
  productId: IProduct;
  sizeId: ISize;
  colorId: IColor;
  material?: string;
  weight: number;
  isLimitedEdition?: boolean;
  createdAt: Date;
  updatedAt: Date;
}