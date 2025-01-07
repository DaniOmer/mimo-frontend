export interface IProduct {
  _id: string;
  name: string;
  description: string;
  priceEtx: number;
  priceVat?: number;
  priceRange?: string;
  stripeId: string;
  isActive: boolean;
  hasVariants?: boolean;
  variants?: any[];
  inventory?: any[];
  images: IProductImage[] | string[];
  categoryIds: string[];
  featureIds: string[];
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

export interface IProductFeature {
  _id: string;
  name: string; 
  description?: string; 
}