import { z } from "zod";

export const addressSchema = z
  .object({
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
    streetNumber: z.string(),
    street: z
      .string()
      .min(2, "La rue doit comporter au moins 2 caractères.")
      .max(100, "Le rue ne peut pas dépasser 100 caractères.")
      .toLowerCase(),
    city: z
      .string()
      .min(2, "Le ville doit comporter au moins 2 caractères.")
      .max(100, "Le ville ne peut pas dépasser 100 caractères.")
      .toLowerCase(),
    state: z.string().optional(),
    postalCode: z
      .string()
      .min(2, "Le code postal doit comporter au moins 2 caractères.")
      .max(10, "Le code postal ne peut pas dépasser 10 caractères."),
    country: z
      .string()
      .min(2, "Le pays doit comporter au moins 2 caractères.")
      .max(50, "Le pays ne peut pas dépasser 50 caractères."),
    isBilling: z.boolean(),
    isShipping: z.boolean(),
    isDefault: z.boolean().optional(),
  })
  .refine((data) => data.isBilling || data.isShipping, {
    message:
      "Veuillez sélectionner le type d'adresse (Facturation, Livraison ou les deux)",
    path: ["isBilling", "isShipping"],
  });
