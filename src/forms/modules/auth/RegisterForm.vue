<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="w-full mx-auto flex flex-col gap-y-3">
      <InputField
        v-model="localFormData.firstName"
        name="firstName"
        label="Prénom"
        placeholder="Entrez votre prénom"
        :error="errors.firstName"
      />
      <InputField
        v-model="localFormData.lastName"
        name="lastName"
        label="Nom"
        placeholder="Entrez votre nom"
        :error="errors.lastName"
      />
      <InputField
        v-model="localFormData.email"
        name="email"
        label="Email"
        placeholder="Entrez votre email"
        type="email"
        :error="errors.email"
      />
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
        label="Mot de passe de confirmation"
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
    </div>
    <BaseButton label="S'inscrire" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { registerSchema } from "../../schema/registerSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isTermsOfSale: boolean;
}

const props = defineProps<{
  initialFormData: IRegisterFormData;
  loading?: boolean;
}>();

const emit = defineEmits(["submit"]);
const localFormData = reactive({ ...props.initialFormData });

const { errors, validate } = useFormValidation(registerSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
