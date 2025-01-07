import { httpClientPrivate } from "../../pluggins";
import { IUserPreference } from "./user.types";

const ROUTE_PREFIX = "/preferences";

export const fetchUserPreference = async (
  userId: string,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/${userId}`, {
      signal,
    });
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON FETCHING USER PREFERENCE : ", error);
    throw error;
  }
};

export const updateUserPreference = async (
  data: Omit<IUserPreference, "user" | "_id" | "createdAt" | "updatedAt">,
  userPreferenceId: string,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.put(
      `${ROUTE_PREFIX}/${userPreferenceId}`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON USER PREFERENCE UPDATE : ", error);
    throw error;
  }
};

export const deleteUserPreference = async (
  userPreferenceId: string,
  signal: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.delete(
      `${ROUTE_PREFIX}/${userPreferenceId}`,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON USER PREFERENCE DELETE : ", error);
    throw error;
  }
};
