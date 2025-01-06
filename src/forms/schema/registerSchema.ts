import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caractères.")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^,:;&+*-]).{12,}$/,
    "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
  );

export const registerSchema = z
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
    email: z.string().email("Email invalide.").trim().toLowerCase(),
    password: passwordSchema,
    confirmPassword: z.string(),
    isTermsOfSale: z
      .boolean()
      .refine((val) => val, "Vous devez accepter les CGU."),
    isDefaultPreference: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Les mots de passe ne correspondent pas.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
