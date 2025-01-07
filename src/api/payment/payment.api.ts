import { httpClientPrivate } from "../../pluggins";
import { IPaymentIntent } from "./payment.type";

const ROUTE_PREFIX = "/payments";

export const createPaymentIntent = async (
  data: IPaymentIntent,
  signal?: AbortSignal
) => {
  try {
    const response = await httpClientPrivate.post(
      `${ROUTE_PREFIX}/intents/card`,
      data,
      {
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("ERROR ON CREATING PAYMENT INTENT : ", error);
    throw error;
  }
};
