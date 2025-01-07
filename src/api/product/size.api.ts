import { httpClientPrivate, httpClientPublic } from "../../pluggins";
import type { ISize } from "./size.types";

const ROUTE_PREFIX = "/sizes";

export async function fetchAllSizes(signal?: AbortSignal): Promise<ISize[]> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING SIZES: ", error);
    throw error;
  }
}

export async function fetchSizeById(sizeId: string, signal?: AbortSignal): Promise<ISize> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${sizeId}`, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON FETCHING SIZE BY ID (${sizeId}): `, error);
    throw error;
  }
}

export async function createSize(sizeData: Partial<ISize>, signal?: AbortSignal): Promise<ISize> {
  try {
    const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, sizeData, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON CREATING SIZE: ", error);
    throw error;
  }
}

export async function updateSize(sizeId: string, sizeData: Partial<ISize>, signal?: AbortSignal): Promise<ISize> {
  try {
    const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${sizeId}`, sizeData, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON UPDATING SIZE (${sizeId}): `, error);
    throw error;
  }
}

export async function deleteSize(sizeId: string, signal?: AbortSignal): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/${sizeId}`, { signal });
  } catch (error) {
    console.log(`ERROR ON DELETING SIZE (${sizeId}): `, error);
    throw error;
  }
}

export async function deleteMultipleSizes(sizeIds: string[], signal?: AbortSignal): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { sizeIds }, signal });
  } catch (error) {
    console.log("ERROR ON DELETING MULTIPLE SIZES: ", error);
    throw error;
  }
}
