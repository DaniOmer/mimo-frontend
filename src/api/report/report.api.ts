import { httpClientPrivate } from "../../pluggins";

const ROUTE_PREFIX = "/orders/analytics";

export async function fetchRevenueData(startDate: string, endDate: string, signal?: AbortSignal) {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/revenue`, {
    params: { startDate, endDate },
    signal
  });
  return response.data.data;
}

export async function fetchSalesByCategoryData(startDate: string, endDate: string, signal?: AbortSignal) {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/sales-by-category`, {
    params: { startDate, endDate },
    signal
  });
  return response.data.data;
}

export async function fetchSalesByProductData(startDate: string, endDate: string, signal?: AbortSignal) {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/sales-by-product`, {
    params: { startDate, endDate },
    signal
  });
  return response.data.data;
}

export async function fetchAverageCartValueData(startDate: string, endDate: string, signal?: AbortSignal) {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/average-cart-value`, {
    params: { startDate, endDate },
    signal
  });
  return response.data.data;
}

export async function fetchNewCustomersData(startDate: string, endDate: string, signal?: AbortSignal) {
  const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/new-customers`, {
    params: { startDate, endDate },
    signal
  });
  return response.data.data;
}