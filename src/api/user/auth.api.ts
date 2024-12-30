import { httpClientPublic } from "../../pluggins";
import { IUserCreate, AuthType } from "./user.types";

const ROUTE_PREFIX = "/auth";
export const createUser = async (data: IUserCreate, signal: AbortSignal) => {
  const response = await httpClientPublic.post(
    `${ROUTE_PREFIX}/register/${AuthType.Basic}`,
    data,
    {
      signal,
    }
  );
  return response.data.data;
};
