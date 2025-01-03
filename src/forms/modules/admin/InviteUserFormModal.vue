<template>
  <Modal :visible="visible" @close="onClose" :title="'Inviter un Utilisateur'">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <InputField
        v-model="localInviteData.firstName"
        name="firstName"
        label="Prénom"
        placeholder="Saisir le prénom"
        :error="errors.firstName"
      />

      <InputField
        v-model="localInviteData.lastName"
        name="lastName"
        label="Nom"
        placeholder="Saisir le nom"
        :error="errors.lastName"
      />

      <InputField
        v-model="localInviteData.email"
        name="email"
        label="Email"
        type="email"
        placeholder="Saisir l'email"
        :error="errors.email"
      />

      <div class="w-full mt-3">
        <label class="block text-sm font-medium text-primary"> Rôle </label>
        <FilterSelect
          v-model="localInviteData.role"
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
import { reactive } from "vue";
import { defineProps, defineEmits } from "vue";
import { useFormValidation } from "../../../composables/useFormValidation";
import InputField from "../../../components/form/InputField.vue";
import BaseButton from "../../../components/form/BaseButton.vue";
import Modal from "../../../components/Modal.vue";
import FilterSelect from "../../../components/FilterSelect.vue";
import { inviteUserSchema } from "../../schema/inviteUserSchema";

interface RoleOption {
  label: string;
  value: string;
}

const props = defineProps<{
  visible: boolean;
  initialData: {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  roles: RoleOption[];
  submitLabel?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    data: { email: string; role: string; firstName: string; lastName: string }
  ): void;
  (e: "close"): void;
}>();

const localInviteData = reactive({
  ...props.initialData,
  role: props.initialData.role || props.roles[0]?.value || '', 
});

const { errors, validate } = useFormValidation(inviteUserSchema);

function handleSubmit() {
  if (!validate(localInviteData)) {
    return;
  }
  emit("submit", { ...localInviteData });
}

function onClose() {
  emit("close");
}

const submitLabel = props.submitLabel || "Inviter";
</script>
