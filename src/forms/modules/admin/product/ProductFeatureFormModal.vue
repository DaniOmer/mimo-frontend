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
        <div class="flex justify-end space-x-2">
          <BaseButton
            v-if="isEditing"
            type="button"
            @click="onCancel"
            color="secondary"
            :loading="loading"
            label="Annuler"
          />
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
import type { IProductFeature } from "../../../../api/";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { productFeatureFormSchema } from "../../../schema/productFeatureFormSchema";

interface ProductFeatureForm {
  name: string;
  description?: string;
}

const props = defineProps<{
  visible: boolean;
  initialData: Partial<IProductFeature> | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Partial<IProductFeature>): void;
  (e: "close"): void;
}>();

const isEditing = computed(() => !!props.initialData);
const modalTitle = computed(() =>
  isEditing.value
    ? "Éditer la Caractéristique Produit"
    : "Créer une Nouvelle Caractéristique Produit"
);

const form = reactive<ProductFeatureForm>({
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

const { errors, validate } = useFormValidation(productFeatureFormSchema);

function handleSubmit() {
  if (!validate(form)) return;
  emit("submit", { ...form });
}

function onCancel() {
  emit("close");
}

function close() {
  emit("close");
}
</script>
