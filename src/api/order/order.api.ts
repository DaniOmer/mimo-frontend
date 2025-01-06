import { httpClientPrivate } from "../../pluggins";
import { IOrder } from "./order.types";

const ROUTE_PREFIX = "/orders";


export const fetchOders = async (signal: AbortSignal): Promise<IOrder[]> => {
    try {
        const response = await httpClientPrivate.get(`${ROUTE_PREFIX}/me`, {
            signal
        });
        return response.data.data;
    } catch (error) {
        console.log("ERROR ON GET ORDERS : ", error);
        throw error;
    }
}


