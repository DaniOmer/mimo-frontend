import { httpClientPrivate } from "../../pluggins"; 
import { IOrder, OrderStatus } from "./order.types";

const ROUTE_PREFIX = "/orders";

export const fetchAllOrders = async (signal?: AbortSignal): Promise<IOrder[]> => {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}`, { signal });
  return response.data.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  signal?: AbortSignal
): Promise<IOrder> => {
  const response = await httpClientPrivate.patch(`${ROUTE_PREFIX}/${orderId}/status`, { status }, { signal });
  return response.data.data;
};

export const getOrdersByUserId = async (userId: string, signal?: AbortSignal): Promise<IOrder[]> => {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/user/${userId}`, { signal });
  return response.data.data;
}

export const getOrderByNumber = async (number: string, signal?: AbortSignal): Promise<IOrder> => {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/number/${number}`, { signal });
  return response.data.data;
}
