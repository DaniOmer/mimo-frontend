import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  description: z.string().optional(),
  priceEtx: z
    .number({
      required_error: "Le prix HT est requis.",
      invalid_type_error: "Le prix HT doit être un nombre.",
    })
    .min(0, "Le prix HT doit être supérieur ou égal à 0."),
  categoryIds: z.array(z.string()).optional(),
  featureIds: z.array(z.string()).optional(),
  colorIds: z.array(z.string()).optional(),
  images: z.any().optional(), // on peut affiner si on veut
});