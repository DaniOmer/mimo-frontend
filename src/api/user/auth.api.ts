import { httpClientPublic } from "../../pluggins";
import { IUserCreate, IEmailVerify, AuthType, IUserLogin, IPasswordResetRequest, IPasswordReset } from "./user.types";

const ROUTE_PREFIX = "/auth";
export const registerUser = async (data: IUserCreate, signal: AbortSignal) => {
  try {
    const response = await httpClientPublic.post(
      `${ROUTE_PREFIX}/register/${AuthType.Basic}`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON USER REGISTER : ", error);
    throw error;
  }
};

export const loginUser = async (data: IUserLogin, signal: AbortSignal) => {
  try {
    console.log("FROM LOGIN USER ", "STARTING");
    const response = await httpClientPublic.post(
      `${ROUTE_PREFIX}/login/${AuthType.Basic}`,
      data,
      {
        signal,
      }
    );
    return {
      token: response.data.token,
      user: response.data.data,
    };
  } catch (error) {
    console.log("ERROR ON USER LOGIN : ", error);
    throw error;
  }
};

export const verifyEmail = async (data: IEmailVerify, signal: AbortSignal) => {
  try {
    const response = await httpClientPublic.post(
      `${ROUTE_PREFIX}/email/confirm`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON EMAIL VERIFICATION : ", error);
    throw error;
  }
};


export const resetPassword = async (data: IPasswordResetRequest, signal: AbortSignal) => {
  try {
    const response = await httpClientPublic.post(
      `${ROUTE_PREFIX}/password/reset-request`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON PASSWORD RESET : ", error);
    throw error;
  }
}


export const resetPasswordConfirm = async (data: IPasswordReset, signal: AbortSignal) => {
  try {
    const response = await httpClientPublic.post(
      `${ROUTE_PREFIX}/password/reset-confirm`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON PASSWORD RESET CONFIRMATION : ", error);
    throw error;
  }
}