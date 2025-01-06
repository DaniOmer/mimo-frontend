import { z } from "zod";

export const editUserSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis.").max(100),
  lastName: z.string().min(1, "Le nom est requis.").max(100),
  email: z.string().email("Email invalide.").trim().toLowerCase(),
  role: z.string().min(1, "Le rôle est requis."),
});
