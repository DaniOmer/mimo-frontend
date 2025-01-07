export interface IProduct {
  _id: string;
  name: string;
  description: string;
  priceEtx: number;
  priceVat: number;
  priceRange?: string;
  stripeId: string;
  isActive: boolean;
  hasVariants?: boolean;
  variants?: any[];
  inventory?: any[];
  images: IProductImage[] | string[];
  categories: ICategory[];
  features: IFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductImage {
  _id: string;
  product_id: string;
  url: string;
  isPrimary?: boolean;
  altText?: string;
  resolution?: string;
  type?: string;
  order?: number;
}

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface IFeature {
  _id: string;
  name: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  priceEtx: number;
  categoryIds: string[];
  featureIds: string[];
  colorIds: string[];
  images: File[];
}

export interface IProductFilter {
  productId?: string;
  isActive?: boolean;
  categoryIds?: string[];
  featureIds?: string[];
  min_price?: number;
  max_price?: number;
  size?: string[];
  color?: string[];
}

export interface IProductVariant {
  _id: string;
  name: string;
  description?: string;
  priceEtx?: number;
  priceVat?: number;
  isActive: boolean;
  images?: string[];
  categoryIds: string[];
  featureIds?: string[];
  createdBy: string | IUser;
  updatedBy?: string | IUser;
  stripeId?: string;
  hasVariants: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parentId?: string | ICategory;
}

export interface IFeature {
  _id: string;
  name: string;
  description?: string;
}
