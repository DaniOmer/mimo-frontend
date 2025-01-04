import { httpClientPublic } from "../../pluggins";
import { IProduct } from "./product.types";
import { IProductVariant } from "./productVariant.types";

const ROUTE_PREFIX = "/products";

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await httpClientPublic.get(`${ROUTE_PREFIX}/with-variants`);
    return response.data.data;
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

export const searchProductVariants = async (selectedSizes: string[], selectedColors: string[]): Promise<IProductVariant[]> => {
  try {
    const params = new URLSearchParams();
    selectedSizes.forEach(sizeId => params.append('sizeIds', sizeId));
    selectedColors.forEach(colorId => params.append('colorIds', colorId));

    const response = await httpClientPublic.get(`/product-variants/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la recherche des variantes de produits :", error);
    throw error;
  }
};

export const searchProductsByCategories = async (selectedCategories: string[]): Promise<IProduct[]> => {
  try {
    const params = new URLSearchParams();
    selectedCategories.forEach(categoryId => params.append('categoryIds', categoryId));

    const response = await httpClientPublic.get(`/products/search?${params.toString()}`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error("No products found for the selected categories");
      return [];
    }
  } catch (error) {
    console.error("Error searching products by categories", error);
    return [];
  }
};