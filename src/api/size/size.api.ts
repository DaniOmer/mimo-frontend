import { httpClientPublic } from "../../pluggins";
import { ISize } from "./size.types";

const ROUTE_PREFIX = "/sizes";

export const fetchSizes = async (): Promise<ISize[]> => {
  try {
    const response = await httpClientPublic.get(ROUTE_PREFIX);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};