import { z } from "zod";

const userPreferenceSchema = z.object({
  isEmailNotification: z.boolean(),
  isSmsNotification: z.boolean(),
  isPushNotification: z.boolean(),
  marketingConsent: z.boolean(),
  cookiesConsent: z.boolean(),
  personalizedAds: z.boolean(),
  language: z.string(),
  currency: z.string(),
});

export default userPreferenceSchema;
