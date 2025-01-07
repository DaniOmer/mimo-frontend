import { z } from "zod";
import { variantFormSchema } from "./productVariant.schema";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom du produit est requis." })
    .max(100, { message: "Le nom du produit ne peut pas dépasser 100 caractères." }),
  
  description: z
    .string()
    .min(1, { message: "La description du produit est requise." }),
  
  priceEtx: z
    .number()
    .min(0, { message: "Le prix HT doit être positif." }),
  
//   priceVat: z
//     .number()
//     .min(0, { message: "Le prix TTC doit être positif." }),
  
  hasVariants: z
    .boolean(),
  
  variants: z
    .array(variantFormSchema)
    .optional(),
  
  categoryIds: z
    .array(z.string())
    .min(1, { message: "Au moins une catégorie doit être sélectionnée." }),
  
  featureIds: z
    .array(z.string())
    .min(1, { message: "Au moins une fonctionnalité doit être sélectionnée." }),
})
.refine((data) => {
  if (data.hasVariants) {
    return data.variants && data.variants.length > 0;
  }
  return true;
}, {
  message: "Au moins une variante doit être ajoutée si le produit a des variantes.",
  path: ["variants"],
});
