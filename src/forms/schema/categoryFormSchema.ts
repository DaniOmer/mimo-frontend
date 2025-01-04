import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis." }),
  description: z.string().min(1, { message: "La description est requise." }),
});
