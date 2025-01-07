import { httpClientPrivate, httpClientPublic } from "../../pluggins";
import type { IProductFeature } from "./productFeature.types";

const ROUTE_PREFIX = "/product-features";

export async function fetchAllProductFeatures(
  signal?: AbortSignal
): Promise<IProductFeature[]> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING PRODUCT FEATURES: ", error);
    throw error;
  }
}

export async function fetchProductFeatureById(
  featureId: string,
  signal?: AbortSignal
): Promise<IProductFeature> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${featureId}`, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON FETCHING PRODUCT FEATURE BY ID (${featureId}): `, error);
    throw error;
  }
}

export async function createProductFeature(
  featureData: Partial<IProductFeature>,
  signal?: AbortSignal
): Promise<IProductFeature> {
  try {
    const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, featureData, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON CREATING PRODUCT FEATURE: ", error);
    throw error;
  }
}

export async function updateProductFeature(
  featureId: string,
  featureData: Partial<IProductFeature>,
  signal?: AbortSignal
): Promise<IProductFeature> {
  try {
    const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${featureId}`, featureData, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON UPDATING PRODUCT FEATURE (${featureId}): `, error);
    throw error;
  }
}

export async function deleteProductFeature(
  featureId: string,
  signal?: AbortSignal
): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/${featureId}`, { signal });
  } catch (error) {
    console.log(`ERROR ON DELETING PRODUCT FEATURE (${featureId}): `, error);
    throw error;
  }
}

export async function deleteMultipleProductFeatures(
  featureIds: string[],
  signal?: AbortSignal
): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { featureIds }, signal });
  } catch (error) {
    console.log("ERROR ON DELETING MULTIPLE PRODUCT FEATURES: ", error);
    throw error;
  }
}
