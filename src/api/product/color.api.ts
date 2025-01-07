import { httpClientPrivate, httpClientPublic } from "../../pluggins"; 
import type { IColor } from "./color.types"; 

const ROUTE_PREFIX = "/colors";

export async function fetchAllColors(signal?: AbortSignal): Promise<IColor[]> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
  return response.data.data; 
}

export async function fetchColorById(colorId: string, signal?: AbortSignal): Promise<IColor> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${colorId}`, { signal });
  return response.data.data;
}

export async function createColor(colorData: Partial<IColor>, signal?: AbortSignal): Promise<IColor> {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, colorData, { signal });
  return response.data.data;
}

export async function updateColor(colorId: string, colorData: Partial<IColor>, signal?: AbortSignal): Promise<IColor> {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${colorId}`, colorData, { signal });
  return response.data.data;
}

export async function deleteColor(colorId: string, signal?: AbortSignal): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${colorId}`, { signal });
}

export async function deleteMutipleColors(colorIds: string[], signal?: AbortSignal): Promise<void> {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { colorIds }, signal });
}
