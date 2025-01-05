<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-24">
      <div>
        <h2 class="text-lg font-semibold mb-4">Notifications</h2>
        <p class="text-sm">
          Vous pouvez choisir si vous souhaitez recevoir des notifications par
          email avec des offres spéciales, des notifications par sms ou encore
          des notifications push.
        </p>
      </div>
      <div class="flex flex-col gap-y-3 justify-center">
        <BaseCheckbox
          v-model="localFormData.isEmailNotification"
          @update:modelValue="
            ($event) => (localFormData.isEmailNotification = $event)
          "
          label="Recevoir des notifications par email"
          name="isEmailNotification"
          :error="errors.isEmailNotification"
        />
        <BaseCheckbox
          v-model="localFormData.isSmsNotification"
          @update:modelValue="
            ($event) => (localFormData.isSmsNotification = $event)
          "
          label="Recevoir des notifications par sms"
          name="isSmsNotification"
          :error="errors.isSmsNotification"
        />
        <BaseCheckbox
          v-model="localFormData.isPushNotification"
          @update:modelValue="
            ($event) => (localFormData.isPushNotification = $event)
          "
          label="Recevoir des notifications push"
          name="isPushNotification"
          :error="errors.isPushNotification"
        />
      </div>
    </div>
    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-24">
      <div>
        <h2 class="text-lg font-semibold mb-4">Consentements</h2>
        <p class="text-sm">
          Vous pouvez choisir si vous souhaitez recevoir des offres marketing,
          accepter les cookies et recevoir des publicités personnalisées.
        </p>
      </div>
      <div class="flex flex-col gap-y-3 justify-center">
        <BaseCheckbox
          v-model="localFormData.marketingConsent"
          @update:modelValue="
            ($event) => (localFormData.marketingConsent = $event)
          "
          label="Consentir aux notifications marketing"
          name="marketingConsent"
          :error="errors.marketingConsent"
        />
        <BaseCheckbox
          v-model="localFormData.cookiesConsent"
          @update:modelValue="
            ($event) => (localFormData.cookiesConsent = $event)
          "
          label="Consentir aux cookies"
          name="cookiesConsent"
          :error="errors.cookiesConsent"
        />
        <BaseCheckbox
          v-model="localFormData.personalizedAds"
          @update:modelValue="
            ($event) => (localFormData.personalizedAds = $event)
          "
          label="Consentir aux annonces personnalisées"
          name="personalizedAds"
          :error="errors.personalizedAds"
        />
      </div>
      <div class="w-full col-start-2 mt-20">
        <BaseButton label="Sauvegarder" type="submit" :loading="loading" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import BaseCheckbox from "../../../components/form/BaseCheckbox.vue";
import BaseButton from "../../../components/form/BaseButton.vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import userPreferenceSchema from "../../schema/userPreferenceSchema";

export interface IUserPreferenceFormData {
  isEmailNotification: boolean;
  isSmsNotification: boolean;
  isPushNotification: boolean;
  marketingConsent: boolean;
  cookiesConsent: boolean;
  personalizedAds: boolean;
  language: string;
  currency: string;
}

const props = defineProps<{
  initialFormData: IUserPreferenceFormData;
  loading?: boolean;
}>();

const localFormData = reactive({
  isEmailNotification: props.initialFormData.isEmailNotification ?? false,
  isSmsNotification: props.initialFormData.isSmsNotification ?? false,
  isPushNotification: props.initialFormData.isPushNotification ?? false,
  marketingConsent: props.initialFormData.marketingConsent ?? false,
  cookiesConsent: props.initialFormData.cookiesConsent ?? false,
  personalizedAds: props.initialFormData.personalizedAds ?? false,
  language: props.initialFormData.language,
  currency: props.initialFormData.currency,
});

const emit = defineEmits(["submit"]);
const { errors, validate } = useFormValidation(userPreferenceSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
