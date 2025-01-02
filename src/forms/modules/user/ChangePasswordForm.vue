<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="w-full mx-auto flex flex-col gap-y-3">
      <InputField
        v-model="localFormData.oldPassword"
        name="odlPassword"
        label="Mot de passe actuel"
        placeholder="Mot de passe"
        type="password"
        :error="errors.oldPassword"
      />
      <InputField
        v-model="localFormData.newPassword"
        name="newPassword"
        label="Nouveau mot de passe"
        placeholder="Nouveau mot de passe"
        type="password"
        :error="errors.newPassword"
      />
      <InputField
        v-model="localFormData.confirmPassword"
        name="confirmPassword"
        label="Nouveau mot de passe"
        placeholder="Confirmez le nouveau mot de passe"
        type="password"
        :error="errors.confirmPassword"
      />
    </div>
    <p v-if="submitError" class="text-red-600">{{ submitError }}</p>
    <BaseButton label="Se connecter" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { changePasswordSchema } from "../../schema/changePasswordSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface IChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const props = defineProps<{
  initialFormData: IChangePasswordFormData;
  loading?: boolean;
  submitError?: string;
}>();

const emit = defineEmits(["submit"]);
const localFormData = reactive({ ...props.initialFormData });

const { errors, validate } = useFormValidation(changePasswordSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
