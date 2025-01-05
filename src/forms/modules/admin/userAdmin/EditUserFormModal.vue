<template>
  <Modal :visible="visible" @close="onClose" :title="'Modifier l\'Utilisateur'">
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
        <label class="block text-sm font-medium text-primary"> Rôle </label>
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
  </Modal>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { useFormValidation } from "../../../../composables/useFormValidation";
import InputField from "../../../../components/form/InputField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import Modal from "../../../../components/Modal.vue";
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
  ...props.userData,
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
}

const submitLabel = props.submitLabel || "Enregistrer";

watch(() => localUserData.role, (newValue) => {
  console.log("Rôle sélectionné :", newValue);
});
</script>
