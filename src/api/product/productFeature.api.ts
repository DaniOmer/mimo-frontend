import { httpClientPrivate, httpClientPublic } from "../../pluggins";
import type { IProductFeature } from "./productFeature.types";

const ROUTE_PREFIX = "/product-features";


export async function fetchAllProductFeatures(
  signal?: AbortSignal
): Promise<IProductFeature[]> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
  return response.data.data;
}


export async function fetchProductFeatureById(
  featureId: string,
  signal?: AbortSignal
): Promise<IProductFeature> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${featureId}`, { signal });
  return response.data.data;
}


export async function createProductFeature(
  featureData: Partial<IProductFeature>,
  signal?: AbortSignal
): Promise<IProductFeature> {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, featureData, { signal });
  return response.data.data;
}


export async function updateProductFeature(
  featureId: string,
  featureData: Partial<IProductFeature>,
  signal?: AbortSignal
): Promise<IProductFeature> {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${featureId}`, featureData, { signal });
  return response.data.data;
}

export async function deleteProductFeature(
  featureId: string,
  signal?: AbortSignal
): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${featureId}`, { signal });
}

export async function deleteMultipleProductFeatures(
  featureIds: string[],
  signal?: AbortSignal
): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { featureIds }, signal });
}
