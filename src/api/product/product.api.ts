import { httpClientPublic } from "../../pluggins";
import { IProduct } from "./product.types";

const ROUTE_PREFIX = "/products";

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await httpClientPublic.get(ROUTE_PREFIX);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};