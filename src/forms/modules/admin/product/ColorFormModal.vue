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
          v-model="form.hexCode"
          name="hexCode"
          label="Code Hexadécimal"
          placeholder="#FFFFFF"
          required
          :error="errors.hexCode"
        />
        <div class="flex items-center">
          <input
            type="checkbox"
            id="isTrending"
            v-model="form.isTrending"
            class="mr-2 h-4 w-4 rounded border-gray-300 text-quaternary"
          />
          <label for="isTrending" class="text-sm text-gray-700">
            Tendance
          </label>
        </div>
        <InputField
          v-model="form.colorGroup"
          name="colorGroup"
          label="Groupe de Couleur"
          placeholder="Saisir le groupe de couleur"
          :error="errors.colorGroup"
        />
        <div class="flex justify-end space-x-2 px-24">
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
import type { IColor } from "../../../../api/";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { colorFormSchema } from "../../../schema/colorFormSchema";

interface ColorForm {
  name: string;
  hexCode: string;
  isTrending?: boolean;
  colorGroup?: string;
}

const props = defineProps<{
  visible: boolean;
  initialData: Partial<IColor> | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Partial<IColor>): void;
  (e: "close"): void;
}>();

const isEditing = computed(() => !!props.initialData);
const modalTitle = computed(() =>
  isEditing.value ? "Éditer la Couleur" : "Créer une Nouvelle Couleur"
);

const form = reactive<ColorForm>({
  name: "",
  hexCode: "",
  isTrending: false,
  colorGroup: "",
});

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.hexCode = newData.hexCode || "";
      form.isTrending = newData.isTrending ?? false;
      form.colorGroup = newData.colorGroup || "";
    } else {
      form.name = "";
      form.hexCode = "";
      form.isTrending = false;
      form.colorGroup = "";
    }
  },
  { immediate: true }
);

const { errors, validate } = useFormValidation(colorFormSchema);

function handleSubmit() {
  if (!validate(form)) return;
  emit("submit", { ...form });
}

function close() {
  emit("close");
}
</script>
