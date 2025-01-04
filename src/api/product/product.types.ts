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

export interface IProductFeature {
  _id: string;
  name: string; 
  description?: string; 
}