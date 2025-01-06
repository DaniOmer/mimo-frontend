<template>
    <div class="max-w-md mx-auto mt-12">
      <h1 class="text-xl font-bold mb-6">Réinitialisation du mot de passe</h1>
      <p class="text-gray-600 mb-4">
        Veuillez entrer votre e-mail pour recevoir un lien de réinitialisation.
      </p>
      <InputField
        v-model="resetEmailOrPhone"
        name="emailOrPhone"
        label="E-mail"
        placeholder="Entrez votre e-mail"
        :error="resetErrors.emailOrPhone"
      />
      <div class="flex justify-end mt-4">
        <BaseButton label="Envoyer" @click="handleResetPassword" />
      </div>
      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from "vue";
  import { useAuthStore } from "../../stores/modules/auth.store";
  import InputField from "../../components/form/InputField.vue";
  import BaseButton from "../../components/form/BaseButton.vue";
  
  const resetEmailOrPhone = ref("");
  const resetErrors = reactive({
    emailOrPhone: "",
  });
  const successMessage = ref("");
  
  const authStore = useAuthStore();
  
  const handleResetPassword = async () => {
    if (!resetEmailOrPhone.value) {
      resetErrors.emailOrPhone = "Ce champ est obligatoire.";
      return;
    }
  
    try {
      await authStore.resetPassword(resetEmailOrPhone.value);
      successMessage.value =
        "Un e-mail de réinitialisation a été envoyé avec succès.";
      resetEmailOrPhone.value = ""; 
      resetErrors.emailOrPhone = ""; 
    } catch (error) {
      resetErrors.emailOrPhone =
        "Une erreur s'est produite. Veuillez réessayer.";
      console.error("Erreur de réinitialisation : ", error);
    }
  };
  </script>
  
  <style scoped>
  .max-w-md {
    max-width: 28rem;
  }
  
  .text-green-600 {
    color: #16a34a;
  }
  
  .text-red-600 {
    color: #e3342f;
  }
  </style>
  