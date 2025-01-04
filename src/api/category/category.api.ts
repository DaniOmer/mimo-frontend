import { httpClientPublic } from "../../pluggins";
import { ICategory } from "./category.types";

const ROUTE_PREFIX = "/categories";

export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await httpClientPublic.get(ROUTE_PREFIX);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};