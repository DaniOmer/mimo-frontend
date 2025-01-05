<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-1">Vos préférences d'utilisation</h1>
    <p class="text-sm">
      Personnalisez votre expérience en fonction de vos besoins. Ajustez vos
      paramètres pour une utilisation optimale de nos services.
    </p>
    <userPreferenceForm
      :initial-form-data="localFormData"
      :loading="userPreferenceStore.isLoading"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted, watch, onUnmounted } from "vue";
import { useToast } from "vue-toast-notification";

import userPreferenceForm, {
  IUserPreferenceFormData,
} from "../../forms/modules/user/userPreferenceForm.vue";
import { useUserPreferenceStore } from "../../stores/modules/userPreference.store";

const $toast = useToast();
const userPreferenceStore = useUserPreferenceStore();
const { preferences, error, status } = toRefs(userPreferenceStore);

const localFormData = reactive({
  isEmailNotification: preferences.value.notifications?.email,
  isSmsNotification: preferences.value.notifications?.sms,
  isPushNotification: preferences.value.notifications?.push,
  marketingConsent: preferences.value?.marketingConsent,
  cookiesConsent: preferences.value?.cookiesConsent,
  personalizedAds: preferences.value?.personalizedAds,
  language: preferences.value?.language,
  currency: preferences.value?.currency,
});

watch(
  () => preferences.value,
  (newPreferences) => {
    if (newPreferences) {
      localFormData.isEmailNotification =
        newPreferences.notifications?.email ?? false;
      localFormData.isSmsNotification =
        newPreferences.notifications?.sms ?? false;
      localFormData.isPushNotification =
        newPreferences.notifications?.push ?? false;
      localFormData.marketingConsent = newPreferences.marketingConsent ?? false;
      localFormData.cookiesConsent = newPreferences.cookiesConsent ?? false;
      localFormData.personalizedAds = newPreferences.personalizedAds ?? false;
    }
  },
  { immediate: true }
);

const handleFormSubmit = async (data: IUserPreferenceFormData) => {
  try {
    const updatedPreference = {
      ...preferences.value,
      notifications: {
        email: data.isEmailNotification,
        sms: data.isSmsNotification,
        push: data.isPushNotification,
      },
      marketingConsent: data.marketingConsent,
      cookiesConsent: data.cookiesConsent,
      personalizedAds: data.personalizedAds,
    };
    await userPreferenceStore.updateUserPreference(
      updatedPreference,
      preferences.value?._id
    );

    if (status.value === "success") {
      $toast.success("Vos informations ont été mis à jours avec succès.", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      $toast.error(error.value.toString(), {
        position: "top-right",
        duration: 3000,
      });
      console.error("Mise à jour échouée:", error.value);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  if (!preferences.value) {
    await userPreferenceStore.fetchUserPreference();
  }
});

onUnmounted(() => {
  userPreferenceStore.resetStatus();
});
</script>
