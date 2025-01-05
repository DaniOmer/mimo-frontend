import { httpClientPublic } from "../../pluggins";
import { IProduct } from "./product.types";

const ROUTE_PREFIX = "/products";

export const fetchActiveProducts = async (
  signal?: AbortSignal
): Promise<IProduct[]> => {
  try {
    const response = await httpClientPublic.get(ROUTE_PREFIX, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};

export const fetchProductWithVariants = async (
  id: string,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPublic.get(
      `${ROUTE_PREFIX}/${id}/variants`,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit avec variantes pour l'ID ${id} :`,
      error
    );
    throw error;
  }
};

export const fetchProductFilters = async (signal?: AbortSignal) => {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/filters`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des filtres :", error);
    throw error;
  }
};
