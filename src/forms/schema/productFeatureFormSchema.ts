import { z } from "zod";

export const productFeatureFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }).optional(),
});
