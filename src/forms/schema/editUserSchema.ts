import { z } from "zod";

export const editUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis.")
    .max(100, "Le prénom ne peut pas dépasser 100 caractères.")
    .regex(/^[A-Za-zÀ-ÿ '-]+$/, "Le prénom contient des caractères invalides."),
  
  lastName: z
    .string()
    .min(1, "Le nom est requis.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères.")
    .regex(/^[A-Za-zÀ-ÿ '-]+$/, "Le nom contient des caractères invalides."),
  
  email: z
    .string()
    .email("Email invalide.")
    .trim()
    .toLowerCase(),
  
  role: z
    .string()
    .min(1, "Le rôle est requis."),
});
