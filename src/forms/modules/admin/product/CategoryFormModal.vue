<template>
  <BaseModal :isOpen="visible" :close="close">
    <template #header>
      <h2 class="text-lg font-semibold">
        {{ modalTitle }}
      </h2>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <InputField
          v-model="form.name"
          name="name"
          label="Nom"
          placeholder="Saisir le nom"
          required
          :error="errors.name"
        />

        <TextAreaField
          v-model="form.description"
          name="description"
          label="Description"
          placeholder="Saisir la description"
          :rows="3"
          :error="errors.description"
        />

        <div class="flex justify-end px-24 space-x-2">
          <BaseButton
            type="submit"
            color="primary"
            :loading="loading"
            :label="isEditing ? 'Mettre à Jour' : 'Créer'"
          />
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, watch, reactive } from "vue";
import BaseModal from "../../../../components/BaseModal.vue";
import InputField from "../../../../components/form/InputField.vue";
import TextAreaField from "../../../../components/form/TextAreaField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import type { ICategory } from "../../../../api";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { categoryFormSchema } from "../../../schema/categoryFormSchema";

interface CategoryForm {
  name: string;
  description: string;
}

const props = defineProps<{
  visible: boolean;
  initialData: Partial<ICategory> | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Partial<ICategory>): void;
  (e: "close"): void;
}>();

const isEditing = computed(() => !!props.initialData);
const modalTitle = computed(() =>
  isEditing.value ? "Éditer la Catégorie" : "Créer une Nouvelle Catégorie"
);

const form = reactive<CategoryForm>({
  name: "",
  description: "",
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.description = newData.description || "";
    } else {
      form.name = "";
      form.description = "";
    }
  },
  { immediate: true }
);

const { errors, validate } = useFormValidation(categoryFormSchema);

function handleSubmit() {
  if (!validate(form)) return;
  emit("submit", { ...form });
}

function close() {
  emit("close");
}
</script>
