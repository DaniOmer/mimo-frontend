import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const invitationSchema = z
  .object({
    tokenHash: z.string().nonempty("Token manquant ou invalide."),
    password: passwordSchema,
    confirmPassword: z.string(),
    isTermsOfSale: z
      .boolean()
      .refine((val) => val, "Vous devez accepter les CGU."),
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
