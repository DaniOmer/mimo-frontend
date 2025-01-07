<template>
  <BaseModal :isOpen="visible" :close="close">
    <template #header>
      <h2 class="text-lg font-semibold">{{ modalTitle }}</h2>
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
        <InputField
          v-model="form.dimensions"
          name="dimensions"
          label="Dimensions"
          placeholder="Saisir les dimensions"
          required
          :error="errors.dimensions"
        />
        <InputField
          v-model="form.volume"
          name="volume"
          label="Volume"
          placeholder="Saisir le volume"
          type="number"
          step="0.01"
          :error="errors.isPopular"
        />
        <InputField
          v-model="form.weightCapacity"
          name="weightCapacity"
          label="Capacité de Poids"
          placeholder="Saisir la capacité de poids"
          type="number"
          step="0.01"
          :error="errors.isPopular"
        />
        <div class="flex items-center">
          <input
            type="checkbox"
            id="isPopular"
            v-model="form.isPopular"
            class="mr-2 h-4 w-4 rounded border-gray-300 text-quaternary"
          />
          <label for="isPopular" class="text-sm text-gray-700">
            Populaire
          </label>
        </div>
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
import BaseButton from "../../../../components/form/BaseButton.vue";
import type { ISize } from "../../../../api/";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { sizeFormSchema } from "../../../schema/sizeFormSchema";

interface SizeForm {
  name: string;
  dimensions: string;
  volume?: number | null;
  weightCapacity?: number | null;
  isPopular?: boolean;
}

const props = defineProps<{
  visible: boolean;
  initialData: Partial<ISize> | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Partial<ISize>): void;
  (e: "close"): void;
}>();

const isEditing = computed(() => !!props.initialData);
const modalTitle = computed(() =>
  isEditing.value ? "Éditer la Taille" : "Créer une Nouvelle Taille"
);

const form = reactive<SizeForm>({
  name: "",
  dimensions: "",
  volume: null,
  weightCapacity: null,
  isPopular: false,
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.dimensions = newData.dimensions || "";
      form.volume = newData.volume ?? null;
      form.weightCapacity = newData.weightCapacity ?? null;
      form.isPopular = newData.isPopular ?? false;
    } else {
      form.name = "";
      form.dimensions = "";
      form.volume = null;
      form.weightCapacity = null;
      form.isPopular = false;
    }
  },
  { immediate: true }
);

const { errors, validate } = useFormValidation(sizeFormSchema);

function handleSubmit() {
  if (!validate(form)) return;
  emit("submit", { ...form });
}

function close() {
  emit("close");
}
</script>
