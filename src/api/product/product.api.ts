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

export const fetchProductWithVariants = async (id: string): Promise<IProduct> => {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/${id}/variants`);
    console.log("Réponse reçue :", response);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit avec variantes pour l'ID ${id} :`, error);
    throw error;
  }
};