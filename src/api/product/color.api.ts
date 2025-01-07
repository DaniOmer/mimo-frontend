import { httpClientPrivate, httpClientPublic } from "../../pluggins";
import type { IColor } from "./color.types";

const ROUTE_PREFIX = "/colors";

export async function fetchAllColors(signal?: AbortSignal): Promise<IColor[]> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING COLORS: ", error);
    throw error;
  }
}

export async function fetchColorById(colorId: string, signal?: AbortSignal): Promise<IColor> {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${colorId}`, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON FETCHING COLOR BY ID (${colorId}): `, error);
    throw error;
  }
}

export async function createColor(colorData: Partial<IColor>, signal?: AbortSignal): Promise<IColor> {
  try {
    const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, colorData, { signal });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON CREATING COLOR: ", error);
    throw error;
  }
}

export async function updateColor(colorId: string, colorData: Partial<IColor>, signal?: AbortSignal): Promise<IColor> {
  try {
    const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${colorId}`, colorData, { signal });
    return response.data.data;
  } catch (error) {
    console.log(`ERROR ON UPDATING COLOR (${colorId}): `, error);
    throw error;
  }
}

export async function deleteColor(colorId: string, signal?: AbortSignal): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/${colorId}`, { signal });
  } catch (error) {
    console.log(`ERROR ON DELETING COLOR (${colorId}): `, error);
    throw error;
  }
}

export async function deleteMutipleColors(colorIds: string[], signal?: AbortSignal): Promise<void> {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { colorIds }, signal });
  } catch (error) {
    console.log("ERROR ON DELETING MULTIPLE COLORS: ", error);
    throw error;
  }
}
