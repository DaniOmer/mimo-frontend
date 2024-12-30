import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caractères.")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/,
    "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
  );

export const registerSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis."),
  lastName: z.string().min(1, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  password: passwordSchema,
  isTermsOfSale: z
    .boolean()
    .refine((val) => val, "Vous devez accepter les CGU."),
});
