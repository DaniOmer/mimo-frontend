import { httpClientPublic } from "../../pluggins";
import { IColor } from "./color.types";

const ROUTE_PREFIX = "/colors";

export const fetchColors = async (): Promise<IColor[]> => {
  try {
    const response = await httpClientPublic.get(ROUTE_PREFIX);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    throw error;
  }
};