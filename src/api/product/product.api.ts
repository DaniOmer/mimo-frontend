import { httpClientPublic, httpClientPrivate } from "../../pluggins";
import type { IProduct } from "./product.types";
import type { IProductImage } from "./productImage.types";

const ROUTE_PREFIX = "/products";

export const fetchAllProducts = async (): Promise<IProduct[]> => {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`);
  return response.data.data;
};


export const fetchProductById = async (id: string): Promise<IProduct> => {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${id}`);
  return response.data.data;
};

export const searchProducts = async (filters: {
  name?: string;
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
}): Promise<IProduct[]> => {
  const params = new URLSearchParams();

  if (filters.name) {
    params.append("name", filters.name);
  }
  if (filters.categoryIds) {
    filters.categoryIds.forEach((id) => params.append("categoryIds", id));
  }
  if (filters.minPrice) {
    params.append("minPrice", filters.minPrice.toString());
  }
  if (filters.maxPrice) {
    params.append("maxPrice", filters.maxPrice.toString());
  }

  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/search?${params.toString()}`);
  return response.data.data;
};

export const fetchProductsByCategory = async (
  categoryId: string
): Promise<IProduct[]> => {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/category/${categoryId}`);
  return response.data.data;
};


export const fetchProductsByFeature = async (
  featureId: string
): Promise<IProduct[]> => {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/feature/${featureId}`);
  return response.data.data;
};

export const fetchProductsByStatus = async (isActive: boolean): Promise<IProduct[]> => {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/status?isActive=${isActive}`);
  return response.data.data;
};

export const createProduct = async (
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, productData);
  return response.data.data;
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${id}`, productData);
  return response.data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${id}`);
};

export const toggleProductActivation = async (
  id: string,
  isActive: boolean
): Promise<IProduct> => {
  const response = await httpClientPrivate.patch(`${ROUTE_PREFIX}/${id}/activate`, { isActive });
  return response.data.data;
};

export const duplicateProduct = async (id: string): Promise<IProduct> => {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/${id}/duplicate`);
  return response.data.data;
};

export const addImagesToProduct = async (
  productId: string,
  images: Partial<IProductImage>[]
): Promise<IProduct> => {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/${productId}/images`, { images });
  return response.data.data;
};

export const removeImageFromProduct = async (
  productId: string,
  imageId: string
): Promise<IProduct> => {
  const response = await httpClientPrivate.delete(`${ROUTE_PREFIX}/${productId}/images/${imageId}`);
  return response.data.data;
};
