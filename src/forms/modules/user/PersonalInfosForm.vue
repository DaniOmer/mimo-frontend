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
    </div>
    <BaseButton label="Sauvegarder" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { personnalInfosSchema } from "../../schema/personalInfosSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface IPersonalInfosFormData {
  firstName: string;
  lastName: string;
}

const props = defineProps<{
  initialFormData: IPersonalInfosFormData;
  loading?: boolean;
}>();

const localFormData = reactive({ ...props.initialFormData });
const emit = defineEmits(["submit"]);
const { errors, validate } = useFormValidation(personnalInfosSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
