import { z } from "zod";

const productDetailsSchema = z.object({
  quantity: z
    .number()
    .min(1, "Veuillez sélectionner une quantité valide.")
    .or(z.string().regex(/^\d+$/, "La quantité doit être un nombre valide.")),
});

export default productDetailsSchema;
