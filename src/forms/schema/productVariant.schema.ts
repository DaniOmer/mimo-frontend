// src/validation/productVariant.schema.ts
import { z } from "zod";

export const variantFormSchema = z.object({
  sizeId: z
    .string()
    .or(z.number())
    .nullable()
    .refine((val) => val !== null, { message: "La taille est requise." }),
  
  colorId: z
    .string()
    .or(z.number())
    .nullable()
    .refine((val) => val !== null, { message: "La couleur est requise." }),
  
  priceEtx: z
    .number()
    .min(0, { message: "Le prix TTC doit être positif." }),
});
