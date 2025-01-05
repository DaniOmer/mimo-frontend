<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="w-full mx-auto flex flex-col gap-y-3">
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
    </div>
    <p v-if="submitError" class="text-red-600">{{ submitError }}</p>
    <BaseButton label="Se connecter" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { loginSchema } from "../../schema/loginSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface ILoginFormData {
  email: string;
  password: string;
}

const props = defineProps<{
  initialFormData: ILoginFormData;
  loading?: boolean;
  submitError?: string;
}>();

const emit = defineEmits(["submit"]);
const localFormData = reactive({ ...props.initialFormData });

const { errors, validate } = useFormValidation(loginSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
