<template>
  <div class="max-w-md mx-auto mt-12">
    <h1 class="text-xl font-bold mb-6">Réinitialisation du mot de passe</h1>
    <p class="text-gray-600 mb-4">
      Veuillez entrer votre nouveau mot de passe.
    </p>
    <form @submit.prevent="handleResetPassword" class="space-y-6">
      <InputField
        v-model="newPassword"
        name="password"
        label="Nouveau mot de passe"
        placeholder="Entrez votre nouveau mot de passe"
        type="password"
        :error="errors.password"
      />
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          id="confirm-password"
          v-model="confirmChecked"
          class="h-4 w-4 border-gray-300 rounded focus:ring-primary"
        />
        <label for="confirm-password" class="text-sm text-gray-600">
          Je confirme vouloir réinitialiser mon mot de passe.
        </label>
      </div>
      <div class="flex justify-end mt-4">
        <BaseButton
          label="Réinitialiser"
          type="submit"
          :disabled="!confirmChecked"
          class="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/modules/auth.store";
import InputField from "../../components/form/InputField.vue";
import BaseButton from "../../components/form/BaseButton.vue";

const props = defineProps<{ token: string }>();

const newPassword = ref("");
const confirmChecked = ref(false);
const errors = reactive({ password: "" });
const successMessage = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleResetPassword = async () => {
  if (!newPassword.value) {
    errors.password = "Le mot de passe est obligatoire.";
    return;
  }

  try {
    await authStore.resetPasswordConfirm(props.token, newPassword.value);
    successMessage.value = "Votre mot de passe a été réinitialisé avec succès.";
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    errors.password =
      "Une erreur s'est produite. Veuillez vérifier votre token ou réessayer.";
    console.error("Erreur de réinitialisation :", error);
  }
};
</script>

  