<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <InputField
      v-model="localFormData.password"
      name="password"
      label="Mot de passe"
      placeholder="Entrez votre mot de passe"
      type="password"
      :error="errors.password"
    />
    <InputField
      v-model="localFormData.confirmPassword"
      name="confirmPassword"
      label="Confirmez votre mot de passe"
      placeholder="Confirmez votre mot de passe"
      type="password"
      :error="errors.confirmPassword"
    />
    <div class="mt-4">
      <label class="flex items-center space-x-2">
        <input
          v-model="localFormData.isTermsOfSale"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-quaternary"
        />
        <span class="text-sm text-gray-700">J'accepte les CGU</span>
      </label>
      <p v-if="errors.isTermsOfSale" class="mt-2 text-sm text-red-600">
        {{ errors.isTermsOfSale }}
      </p>
    </div>
    <BaseButton label="Confirmer" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { invitationSchema } from "../../schema/invitationSchema.ts";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface IInvitationFormData {
  tokenHash: string;
  password: string;
  confirmPassword: string;
  isTermsOfSale: boolean;
}

const props = defineProps<{
  initialFormData: IInvitationFormData;
  loading?: boolean;
}>();

const emit = defineEmits(["submit"]);
const localFormData = reactive({ ...props.initialFormData });

const { errors, validate } = useFormValidation(invitationSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
