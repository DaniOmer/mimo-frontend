export interface IProductVariant {
  _id: string;
  priceEtx: number;
  priceVat?: number;
  productId: string;
  sizeId: string;
  colorId: string;
  material?: string;
  weight: number;
  isLimitedEdition?: boolean;
  createdAt: Date;
  updatedAt: Date;
}