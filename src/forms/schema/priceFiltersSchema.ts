import { z } from "zod";

export const PriceFiltersSchema = z
  .object({
    min: z
      .number()
      .nonnegative("Le prix minimum ne peut pas être négatif.")
      .optional(),
    max: z
      .number()
      .nonnegative("Le prix maximum ne peut pas être négatif.")
      .optional(),
  })
  .refine((data) => !data.min || !data.max || data.min <= data.max, {
    message: "Le prix minimum doit être inférieur ou égal au prix maximum.",
    path: ["min", "max"],
  });
