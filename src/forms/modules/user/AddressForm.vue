<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="w-full mx-auto flex flex-col gap-y-3">
      <div class="flex justify-between gap-x-3">
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
      <div class="flex justify-between gap-x-3">
        <InputField
          v-model="localFormData.streetNumber"
          name="streetNumber"
          label="Numéro de rue"
          placeholder="Entrez le numéro de rue"
          :error="errors.streetNumber"
        />
        <InputField
          v-model="localFormData.street"
          name="street"
          label="Rue"
          placeholder="Entrez la rue"
          :error="errors.street"
        />
      </div>
      <div class="flex justify-between gap-x-3">
        <InputField
          v-model="localFormData.postalCode"
          name="postalCode"
          label="Code postal"
          placeholder="Entrez le code postal"
          :error="errors.postalCode"
        />
        <InputField
          v-model="localFormData.city"
          name="city"
          label="Ville"
          placeholder="Entrez la ville"
          :error="errors.city"
        />
      </div>
      <InputField
        v-model="localFormData.state"
        name="state"
        label="État (facultatif)"
        placeholder="Entrez l'état"
        :error="errors.state"
        :optional="true"
      />
      <InputField
        v-model="localFormData.country"
        name="country"
        label="Pays"
        placeholder="Entrez le pays"
        :error="errors.country"
      />

      <!-- Checkboxes -->
      <BaseCheckbox
        v-model="localFormData.isBilling"
        @update:modelValue="($event) => (localFormData.isBilling = $event)"
        label="Adresse de facturation"
        name="isBilling"
        :error="errors.isBilling"
      />
      <BaseCheckbox
        v-model="localFormData.isShipping"
        @update:modelValue="($event) => (localFormData.isShipping = $event)"
        label="Adresse de livraison"
        name="isShipping"
        :error="errors.isShipping"
      />
      <BaseCheckbox
        v-model="localFormData.isDefault"
        @update:modelValue="($event) => (localFormData.isDefault = $event)"
        label="Définir comme adresse par défaut"
        name="isDefault"
        :error="errors.isDefault"
      />
    </div>
    <BaseButton label="Sauvegarder" type="submit" :loading="loading" />
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import { addressSchema } from "../../schema/addressSchema";
import InputField from "../../../components/form/InputField.vue";
import BaseCheckbox from "../../../components/form/BaseCheckbox.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

export interface IAddressFormData {
  firstName: string;
  lastName: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string | "";
  postalCode: string;
  country: string;
  isBilling: boolean;
  isShipping: boolean;
  isDefault: boolean;
}

const props = defineProps<{
  initialFormData: IAddressFormData;
  loading?: boolean;
  submitError?: string;
}>();

const emit = defineEmits(["submit"]);
const localFormData = reactive({ ...props.initialFormData });

const { errors, validate } = useFormValidation(addressSchema);

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", { ...localFormData });
};
</script>
