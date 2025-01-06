import { z } from "zod";

export const colorFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  hexCode: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, { message: "Le code hexadécimal est invalide." }),
  isTrending: z.boolean().optional(),
  colorGroup: z.string().optional(),
});
