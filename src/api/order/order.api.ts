import { httpClientPrivate } from "../../pluggins";
import { IAdminCreateOrderPayload, IOrder, OrderStatus } from "./order.types";

const ROUTE_PREFIX = "/orders";

export const fetchAllOrders = async (
  signal?: AbortSignal
): Promise<IOrder[]> => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING ORDERS : ", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  signal?: AbortSignal
): Promise<IOrder> => {
  try {
    const response = await httpClientPrivate.patch(
      `${ROUTE_PREFIX}/${orderId}/status`,
      { status },
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON UPDATING ORDER STATUS : ", error);
    throw error;
  }
};

export const getOrdersByUserId = async (
  userId: string,
  signal?: AbortSignal
): Promise<IOrder[]> => {
  try {
    const response = await httpClientPrivate.get(
      `${ROUTE_PREFIX}/user/${userId}`,
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON GET ORDERS BY USER ID : ", error);
    throw error;
  }
};

export const getOrderByNumber = async (
  number: string,
  signal?: AbortSignal
): Promise<IOrder> => {
  try {
    const response = await httpClientPrivate.get(
      `${ROUTE_PREFIX}/number/${number}`,
      { signal }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON GET ORDER BY NUMBER : ", error);
    throw error;
  }
};

export const fetchOders = async (signal: AbortSignal): Promise<IOrder[]> => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/me`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON GET ORDERS : ", error);
    throw error;
  }
};

export const createOrderForUser = async (
    userId: string,
    payload: IAdminCreateOrderPayload,
    signal?: AbortSignal
  ): Promise<IOrder> => {
    try {
      const response = await httpClientPrivate.post(
        `${ROUTE_PREFIX}/admin/users/${userId}/order`,
        payload,
        { signal }
      );
      return response.data.data;
    } catch (error) {
      console.log("ERROR ON CREATING ORDER FOR USER BY ADMIN : ", error);
      throw error;
    }
  };
