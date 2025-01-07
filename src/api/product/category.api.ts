import { httpClientPrivate, httpClientPublic } from "../../pluggins"; 
import type { ICategory } from "./category.types"; 

const ROUTE_PREFIX = "/categories";


export async function fetchAllCategories(signal?: AbortSignal): Promise<ICategory[]> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/`, { signal });
  return response.data.data; 
}

export async function fetchCategoryById(categoryId: string, signal?: AbortSignal): Promise<ICategory> {
  const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${categoryId}`, { signal });
  return response.data.data;
}

export async function createCategory(categoryData: Partial<ICategory>, signal?: AbortSignal): Promise<ICategory> {
  const response = await httpClientPrivate.post(`${ROUTE_PREFIX}/`, categoryData, { signal });
  return response.data.data;
}


export async function updateCategory(categoryId: string, categoryData: Partial<ICategory>, signal?: AbortSignal): Promise<ICategory> {
  const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/${categoryId}`, categoryData, { signal });
  return response.data.data;
}

export async function deleteCategory(categoryId: string, signal?: AbortSignal): Promise<void> {
  await httpClientPrivate.delete(`${ROUTE_PREFIX}/${categoryId}`, { signal });
}

export async function deleteMutipleCategories(categoryIds: string[], signal?: AbortSignal): Promise<void> {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/multiple`, { data: { categoryIds }, signal });
}
