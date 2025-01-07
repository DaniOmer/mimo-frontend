<template>
  <div class="max-w-md mx-auto mt-12">
    <h1 class="text-xl font-bold mb-4">Réinitialisation du mot de passe</h1>
    <p class="text-gray-600 mb-6">
      Veuillez entrer votre nouveau mot de passe et confirmer.
    </p>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="w-full mx-auto flex flex-col gap-y-3">
        <InputField
          v-model="localFormData.newPassword"
          name="new-password"
          label="Nouveau mot de passe"
          placeholder="Entrez votre nouveau mot de passe"
          type="password"
          :error="errors.newPassword"
        />
        <InputField
          v-model="localFormData.confirmPassword"
          name="confirm-password"
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre nouveau mot de passe"
          type="password"
          :error="errors.confirmPassword"
        />
      </div>
      <p v-if="submitError" class="text-red-600">{{ submitError }}</p>
      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
      <BaseButton label="Réinitialiser" type="submit" :loading="loading" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { loginSchema } from "../../forms/schema/loginSchema";
import InputField from "../../components/form/InputField.vue";
import BaseButton from "../../components/form/BaseButton.vue";

export interface IResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const props = defineProps<{
  initialFormData?: IResetPasswordFormData; 
  submitError?: string;
}>();

const emit = defineEmits(["submit"]);
const router = useRouter();

const localFormData = reactive({
  newPassword: props.initialFormData?.newPassword || '', 
  confirmPassword: props.initialFormData?.confirmPassword || '', 
});

const errors = reactive<{ [key: string]: string }>({});
const loading = ref(false);
const successMessage = ref("");
const submitError = ref("");

const handleSubmit = async () => {
  errors.newPassword = "";
  errors.confirmPassword = "";
  submitError.value = "";
  successMessage.value = "";

  try {
    const validationSchema = z
      .object({
        newPassword: loginSchema.shape.password,
        confirmPassword: loginSchema.shape.password,
      })
      .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
          path: ["confirmPassword"],
          message: "Les mots de passe ne correspondent pas.",
        }
      );

    validationSchema.parse(localFormData);

    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    successMessage.value = "Votre mot de passe a été réinitialisé avec succès.";
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (validationError) {
    if (validationError instanceof z.ZodError) {
      validationError.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
    } else {
      submitError.value = "Une erreur s'est produite. Veuillez réessayer.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
