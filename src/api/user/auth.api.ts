import { httpClientPublic } from "../../pluggins";
import { IUserCreate, IEmailVerify, AuthType } from "./user.types";

const ROUTE_PREFIX = "/auth";
export const registerUser = async (data: IUserCreate, signal: AbortSignal) => {
  const response = await httpClientPublic.post(
    `${ROUTE_PREFIX}/register/${AuthType.Basic}`,
    data,
    {
      signal,
    }
  );
  return response.data.data;
};

export const verifyEmail = async (data: IEmailVerify, signal: AbortSignal) => {
  const response = await httpClientPublic.post(
    `${ROUTE_PREFIX}/email/confirm`,
    data,
    {
      signal,
    }
  );
  return response.data.data;
};
