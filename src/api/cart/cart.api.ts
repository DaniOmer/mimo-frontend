import { httpClientPrivate } from "../../pluggins";
import { ICart, CartItemCreateDTO, CartItemUpdateDTO } from "./cart.types";

const ROUTE_PREFIX = "/carts";

export const fetchCartByUserId = async (
  signal?: AbortSignal
): Promise<ICart> => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/me`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier :", error);
    throw error;
  }
};

export const addToCart = async (
  data: CartItemCreateDTO,
  signal?: AbortSignal
): Promise<ICart> => {
  try {
    const response = await httpClientPrivate.post(
      `${ROUTE_PREFIX}/item`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
    throw error;
  }
};

export const updateCartItemQuantity = async (
  data: CartItemUpdateDTO,
  signal?: AbortSignal
): Promise<ICart> => {
  try {
    const response = await httpClientPrivate.put(`${ROUTE_PREFIX}/item`, data, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la quantité :", error);
    throw error;
  }
};
