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
      <BaseCheckbox
        v-model="localFormData.isTermsOfSale"
        @update:modelValue="($event) => (localFormData.isTermsOfSale = $event)"
        label="J'accepte les CGU"
        name="isBilling"
        :error="errors.isTermsOfSale"
      />
      <BaseCheckbox
        v-model="localFormData.isDefaultPreference"
        @update:modelValue="
          ($event) => (localFormData.isDefaultPreference = $event)
        "
        label="J'accepte les préférence définis par défaut"
        name="isDefaultPreference"
        :error="errors.isDefaultPreference"
      />
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
import BaseCheckbox from "../../../components/form/BaseCheckbox.vue";

export interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isTermsOfSale: boolean;
  isDefaultPreference: boolean;
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
