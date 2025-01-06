import { httpClientPrivate } from "../../pluggins"; 
import type { ISize } from "./size.types"; 

const ROUTE_PREFIX = "/sizes";

export async function fetchAllSizes(signal?: AbortSignal): Promise<ISize[]> {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/`, { signal });
  return response.data.data; 
}

export async function fetchSizeById(sizeId: string, signal?: AbortSignal): Promise<ISize> {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/${sizeId}`, { signal });
  return response.data.data;
}

export async function createSize(sizeData: Partial<ISize>, signal?: AbortSignal): Promise<ISize> {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, sizeData, { signal });
  return response.data.data;
}

export async function updateSize(sizeId: string, sizeData: Partial<ISize>, signal?: AbortSignal): Promise<ISize> {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${sizeId}`, sizeData, { signal });
  return response.data.data;
}

export async function deleteSize(sizeId: string, signal?: AbortSignal): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${sizeId}`, { signal });
}
