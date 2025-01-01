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

export interface ISize {
  _id: string;
  name: string;
  dimensions: string;
  volume?: number;
  weightCapacity?: number;
  isPopular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IColor {
  _id: string;
  name: string;
  hexCode: string;
  isTrending?: boolean;
  colorGroup?: string;
  createdAt: Date;
  updatedAt: Date;
}