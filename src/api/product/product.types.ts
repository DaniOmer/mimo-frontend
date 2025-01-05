import { IProductImage } from './productImage.types';
import { IProductVariant } from './productVariant.types';
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  priceEtx?: number;
  priceVat?: number;
  stripeId?: string;
  isActive?: boolean;
  images?: IProductImage[];
  categoryIds?: string[];
  featureIds?: string[];
  createdAt?: string;
  updatedAt?: string;
  hasVariants: boolean;
}

export interface IFilters {
  name?: string;
  categoryIds?: string[];
  colorIds?: string[];
  sizeIds?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface IProductWithVariants extends IProduct {
  variants: IProductVariant[];
}



