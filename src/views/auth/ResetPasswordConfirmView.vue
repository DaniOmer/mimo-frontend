<template>
    <div class="max-w-md mx-auto mt-12">
      <h1 class="text-xl font-bold mb-6">Réinitialisation du mot de passe</h1>
      <p class="text-gray-600 mb-4">
        Veuillez entrer votre nouveau mot de passe.
      </p>
      <InputField
        v-model="newPassword"
        name="password"
        label="Nouveau mot de passe"
        placeholder="Entrez votre nouveau mot de passe"
        type="password"
        :error="errors.password"
      />
      <div class="flex justify-end mt-4">
        <BaseButton label="Réinitialiser" @click="handleResetPassword" />
      </div>
      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from "vue";
  import { useAuthStore } from "../../stores/modules/auth.store";
  import InputField from "../../components/form/InputField.vue";
  import BaseButton from "../../components/form/BaseButton.vue";

  const props = defineProps<{ token: string }>();
  
  const newPassword = ref("");
  const errors = reactive({ password: "" });
  const successMessage = ref("");
  
  const authStore = useAuthStore();
  
  const handleResetPassword = async () => {
    if (!newPassword.value) {
      errors.password = "Ce champ est obligatoire.";
      return;
    }
  
    try {
      await authStore.resetPasswordConfirm(props.token, newPassword.value);
      successMessage.value = "Votre mot de passe a été réinitialisé avec succès.";
      newPassword.value = ""; 
      errors.password = ""; 
    } catch (error) {
      errors.password =
        "Une erreur s'est produite. Veuillez vérifier votre token ou réessayer.";
      console.error("Erreur de réinitialisation :", error);
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
  