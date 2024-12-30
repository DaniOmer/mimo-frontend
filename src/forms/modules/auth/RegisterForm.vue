<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div
      class="w-full min-w-[300px] md:w-1/2 lg:w-1/3 mx-auto flex flex-col gap-y-3"
    >
      <InputField
        v-model="formData.firstName"
        name="firstName"
        label="Prénom"
        placeholder="Entrez votre prénom"
        :error="errors.firstName"
      />
      <InputField
        v-model="formData.lastName"
        name="lastName"
        label="Nom"
        placeholder="Entrez votre nom"
        :error="errors.lastName"
      />
      <InputField
        v-model="formData.email"
        name="email"
        label="Email"
        placeholder="Entrez votre email"
        type="email"
        :error="errors.email"
      />
      <InputField
        v-model="formData.password"
        name="password"
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        type="password"
        :error="errors.password"
      />
      <div>
        <label class="flex items-center space-x-2">
          <input
            v-model="formData.isTermsOfSale"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span class="text-sm text-gray-700">J'accepte les CGU</span>
        </label>
        <p v-if="errors.isTermsOfSale" class="mt-2 text-sm text-red-600">
          {{ errors.isTermsOfSale }}
        </p>
      </div>
      <BaseButton label="S'inscrire" type="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { registerSchema } from "../../schema/RegisterSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isTermsOfSale: false,
});

const { errors, validate } = useFormValidation(registerSchema);

const handleSubmit = () => {
  if (!validate(formData.value)) {
    return;
  }
  console.log("Formulaire valide :", formData.value);
};
</script>
