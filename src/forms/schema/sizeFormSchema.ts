// src/schema/sizeFormSchema.ts
import { z } from "zod";

export const sizeFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  dimensions: z.string().min(1, "Les dimensions sont requises"),
  volume: z
    .number({ invalid_type_error: "Le volume doit être un nombre" })
    .nonnegative("Le volume doit être positif")
    .optional()
    .nullable(),
  weightCapacity: z
    .number({ invalid_type_error: "La capacité de poids doit être un nombre" })
    .nonnegative("La capacité de poids doit être positive")
    .optional()
    .nullable(),
  isPopular: z.boolean().optional(),
});
