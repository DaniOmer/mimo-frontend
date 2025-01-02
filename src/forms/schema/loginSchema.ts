import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(12, "Le mot de passe doit contenir au moins 12 caractères.")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^,:;&+*-]).{12,}$/,
    "Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
  );

export const loginSchema = z.object({
  email: z.string().email("Email invalide.").trim().toLowerCase(),
  password: passwordSchema,
});
