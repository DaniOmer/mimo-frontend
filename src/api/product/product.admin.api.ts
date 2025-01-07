import { httpClientPrivate } from "../../pluggins";
import { IProduct } from "../product/product.types";
import { IProductVariant } from "./productVariant.types";

const ROUTE_PREFIX = "/products";

export const createProductAdmin = async (
  productData: Partial<IProduct>,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.post(ROUTE_PREFIX, productData, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    throw error;
  }
};

export const updateProductAdmin = async (
  productId: string,
  productData: Partial<IProduct>,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${productId}`,
      productData,
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du produit ${productId} :`,
      error
    );
    throw error;
  }
};

export const deleteProductAdmin = async (
  productId: string,
  signal?: AbortSignal
): Promise<void> => {
  try {
    await httpClientPrivate.delete(`${ROUTE_PREFIX}/${productId}`, { signal });
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du produit ${productId} :`,
      error
    );
    throw error;
  }
};

export const toggleProductActivationAdmin = async (
  productId: string,
  isActive: boolean,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.patch(
      `${ROUTE_PREFIX}/${productId}/activate`,
      { isActive },
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de l'état du produit ${productId} :`,
      error
    );
    throw error;
  }
};

export const duplicateProductAdmin = async (
  productId: string,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.post(
      `${ROUTE_PREFIX}/${productId}/duplicate`,
      {},
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la duplication du produit ${productId} :`,
      error
    );
    throw error;
  }
};

export const searchProductsAdmin = async (
  filters: Record<string, any>,
  signal?: AbortSignal
): Promise<IProduct[]> => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/search`, {
      params: filters,
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la recherche des produits :", error);
    throw error;
  }
};

export const fetchProductsByStatusAdmin = async (
  isActive: boolean,
  signal?: AbortSignal
): Promise<IProduct[]> => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/status`, {
      params: { isActive },
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits par statut :",
      error
    );
    throw error;
  }
};

export const fetchProductByIdAdmin = async (
  productId: string,
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.get(
      `${ROUTE_PREFIX}/${productId}`,
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit ${productId} :`,
      error
    );
    throw error;
  }
};

export const createProductWithVariantsAdmin = async (
  product: Partial<IProduct>,
  variants: IProductVariant[],
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.post(
      `${ROUTE_PREFIX}/with-variants`,
      { product, variants },
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création du produit avec ses variantes :",
      error
    );
    throw error;
  }
};

export const updateProductWithVariantsAdmin = async (
  productId: string,
  product: Partial<IProduct>,
  variants: IProductVariant[],
  signal?: AbortSignal
): Promise<IProduct> => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${productId}/with-variants`,
      { product, variants },
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour du produit avec ses variantes ${productId} :`,
      error
    );
    throw error;
  }
};
