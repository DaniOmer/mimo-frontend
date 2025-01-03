import { httpClientPrivate } from "../../pluggins";
import { IAddress } from "./address.types";

const ROUTE_PREFIX = "/addresses";
export const getUserAddresses = async (signal: AbortSignal) => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/me`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING ADDRESSES : ", error);
    throw error;
  }
};

export const addAddress = async (
  addressData: Omit<IAddress, "_id" | "user">,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.post(
      `${ROUTE_PREFIX}`,
      addressData,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON ADDING NEW ADDRESS : ", error);
    throw error;
  }
};

export const updateAddress = async (
  addressId: string,
  addressData: Omit<IAddress, "_id" | "user">,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${addressId}`,
      addressData,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON UPDATING ADDRESS : ", error);
    throw error;
  }
};

export const deleteAddress = async (addressId: string, signal: AbortSignal) => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${addressId}`,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON UPDATING ADDRESS : ", error);
    throw error;
  }
};
