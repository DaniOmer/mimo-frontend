export interface IProductVariant {
  _id: string;
  priceEtx: number;
  priceVat: number;
  stripeId?: string;
  productId: string;
  sizeId: string;
  colorId: string;
  material?: string;
  weight: number;
  isLimitedEdition?: boolean;
  createdAt: Date;
  updatedAt: Date;
}