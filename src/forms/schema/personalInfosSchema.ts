import { z } from "zod";

export const personnalInfosSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit comporter au moins 2 caractères.")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères.")
    .trim()
    .toLowerCase(),
  lastName: z
    .string()
    .min(2, "Le nom doit comporter au moins 2 caractères.")
    .max(50, "Le nom ne peut pas dépasser 50 caractères.")
    .trim()
    .toLowerCase(),
});
