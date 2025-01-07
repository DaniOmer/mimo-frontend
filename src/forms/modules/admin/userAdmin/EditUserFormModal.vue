<template>
  <BaseModal :isOpen="visible" :close="onClose">
    <template v-slot:header>
      <h2 class="text-lg font-semibold">Modifier l'Utilisateur</h2>
    </template>

    <template v-slot:body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <InputField
          v-model="localUserData.firstName"
          name="firstName"
          label="Prénom"
          placeholder="Saisir le prénom"
          :error="errors.firstName"
        />

        <InputField
          v-model="localUserData.lastName"
          name="lastName"
          label="Nom"
          placeholder="Saisir le nom"
          :error="errors.lastName"
        />

        <InputField
          v-model="localUserData.email"
          name="email"
          label="Email"
          type="email"
          placeholder="Saisir l'email"
          :error="errors.email"
        />

        <div class="w-full mt-3">
          <label class="block text-sm font-medium text-primary">Rôle</label>
          <FilterSelect
            v-model="localUserData.role"
            :options="roles"
            placeholder="Sélectionner un rôle"
            :isMultiple="false"
          />
          <p v-if="errors.role" class="mt-1 text-sm text-red-600">
            {{ errors.role }}
          </p>
        </div>

        <BaseButton :label="submitLabel" type="submit" :loading="loading" />
      </form>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { useFormValidation } from "../../../../composables/useFormValidation";
import InputField from "../../../../components/form/InputField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import BaseModal from "../../../../components/BaseModal.vue";
import FilterSelect from "../../../../components/FilterSelect.vue";
import { editUserSchema } from "../../../schema/editUserSchema";

interface RoleOption {
  label: string;
  value: string;
}

const props = defineProps<{
  visible: boolean;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  roles: RoleOption[];
  submitLabel?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    data: { firstName: string; lastName: string; email: string; role: string }
  ): void;
  (e: "close"): void;
}>();

const localUserData = reactive({
  firstName: props.userData.firstName || "",
  lastName: props.userData.lastName || "",
  email: props.userData.email || "",
  role: props.userData.role || props.roles[0]?.value || '',
});

const { errors, validate } = useFormValidation(editUserSchema);

function handleSubmit() {
  if (!validate(localUserData)) {
    return;
  }
  emit("submit", { ...localUserData });
}

function onClose() {
  emit("close");
  resetLocalUserData();
}

const submitLabel = computed(
  () => props.submitLabel || "Enregistrer"
);

watch(
  () => props.userData,
  (newUserData) => {
    localUserData.firstName = newUserData.firstName || "";
    localUserData.lastName = newUserData.lastName || "";
    localUserData.email = newUserData.email || "";
    localUserData.role = newUserData.role || props.roles[0]?.value || '';
  },
  { immediate: true }
);

function resetLocalUserData() {
  localUserData.firstName = "";
  localUserData.lastName = "";
  localUserData.email = "";
  localUserData.role = props.roles[0]?.value || '';
}
</script>

