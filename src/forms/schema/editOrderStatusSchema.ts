import z from "zod";
import { OrderStatus } from "../../api/";

export const editOrderStatusSchema = z.object({
  status: z.string().min(1, { message: "Le statut est requis." }),
}).refine((data) => {
    return Object.values(OrderStatus).includes(data.status as OrderStatus);

});

