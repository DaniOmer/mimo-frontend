import { httpClientPrivate } from "../../pluggins";
import { IUser, IPasswordChange } from "./user.types";

const ROUTE_PREFIX = "/users";
export const fetchUser = async (id: string, signal: AbortSignal) => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/${id}`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING USER : ", error);
    throw error;
  }
};

export const updateUser = async (data: IUser, signal: AbortSignal) => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${data._id}`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON USER UPDATE : ", error);
    throw error;
  }
};

export const updatePassword = async (
  data: IPasswordChange,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/password/update`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON PASSWORD UPDATE : ", error);
    throw error;
  }
};
