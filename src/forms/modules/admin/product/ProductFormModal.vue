<template>
  <BaseModal :isOpen="visible" :close="closeModal">
    <template #header>
      <h2 class="text-lg font-semibold text-primary">
        {{ isEditMode ? "Modifier le Produit" : "Créer un Nouveau Produit" }}
      </h2>
    </template>

    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <InputField
          v-model="localFormData.name"
          name="name"
          label="Nom du Produit"
          placeholder="Entrez le nom du produit"
          :error="errors.name"
        />

        <TextAreaField
          v-model="localFormData.description"
          name="description"
          label="Description"
          placeholder="Entrez la description du produit"
          :error="errors.description"
          :rows="3"
        />

        <InputField
          v-model.number="localFormData.priceEtx"
          name="priceEtx"
          label="Prix HT"
          placeholder="0"
          type="number"
          :error="errors.priceEtx"
          min="0"
        />

        <div>
          <label class="block text-sm font-medium text-primary mb-1">
            Catégories
          </label>
          <FilterSelect
            v-model="localFormData.categoryIds"
            :options="categoryOptions"
            placeholder="Sélectionner les catégories"
            :isMultiple="true"
          />
          <p v-if="errors.categoryIds" class="mt-1 text-sm text-red-500">
            {{ errors.categoryIds }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-primary mb-1">
            Caractéristiques
          </label>
          <FilterSelect
            v-model="localFormData.featureIds"
            :options="featureOptions"
            placeholder="Sélectionner les caractéristiques"
            :isMultiple="true"
          />
          <p v-if="errors.featureIds" class="mt-1 text-sm text-red-500">
            {{ errors.featureIds }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-primary mb-1">
            Couleurs
          </label>
          <FilterSelect
            v-model="localFormData.colorIds"
            :options="colorOptions"
            placeholder="Sélectionner les couleurs"
            :isMultiple="true"
          />
          <p v-if="errors.colorIds" class="mt-1 text-sm text-red-500">
            {{ errors.colorIds }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-primary mb-1">
            Images
          </label>
          <div class="space-y-2">
            <div
              v-for="(file, index) in localFormData.images"
              :key="index"
              class="flex items-center justify-between bg-tertiary/10 p-2 rounded"
            >
              <span class="text-sm text-primary flex-1">
                {{ file?.name || "Image n°" + (index + 1) }}
              </span>
              <button
                type="button"
                class="text-red-600 hover:text-red-800 text-sm"
                @click="removeImage(index)"
              >
                Supprimer
              </button>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            class="mt-2 text-sm text-primary"
            @change="handleFileSelection"
          />
          <p v-if="errors.images" class="mt-1 text-sm text-red-500">
            {{ errors.images }}
          </p>
        </div>

        <p v-if="submitError" class="text-sm text-red-600">{{ submitError }}</p>

        <div class="flex justify-end gap-3 mt-4">
          <BaseButton
            color="gray"
            :label="isEditMode ? 'Annuler' : 'Fermer'"
            type="button"
            @click="closeModal"
          />
          <BaseButton
            :label="submitLabel"
            type="submit"
            color="primary"
            :loading="loading"
          />
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { defineProps, defineEmits, watch } from "vue";
import BaseModal from "../../../../components/BaseModal.vue";
import InputField from "../../../../components/form/InputField.vue";
import TextAreaField from "../../../../components/form/TextAreaField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import FilterSelect from "../../../../components/FilterSelect.vue";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { productCreateSchema } from "../../../schema/product.schema.ts";
import { ProductFormData } from "../../../../api/product/product.types.ts";


const props = defineProps<{
  visible: boolean;
  productData?: Partial<ProductFormData>; 
  categoryOptions: { label: string; value: string }[];
  featureOptions: { label: string; value: string }[];
  colorOptions: { label: string; value: string }[];
  submitLabel?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    data: {
      product: ProductFormData;
      variants: any[];
    }
  ): void;
}>();

const isEditMode = computed(() => !!props.productData);

const localFormData = reactive<ProductFormData>({
  name: "",
  description: "",
  priceEtx: 0,
  categoryIds: [],
  featureIds: [],
  colorIds: [],
  images: [],
});

watch(
  () => props.productData,
  (newVal) => {
    if (newVal) {
      localFormData.name = newVal.name || "";
      localFormData.description = newVal.description || "";
      localFormData.priceEtx = newVal.priceEtx ?? 0;
      localFormData.categoryIds = newVal.categoryIds || [];
      localFormData.featureIds = newVal.featureIds || [];
      localFormData.colorIds = newVal.colorIds || [];
      localFormData.images = newVal.images || [];
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const { errors, validate } = useFormValidation(productCreateSchema);

function handleSubmit() {
  if (!validate(localFormData)) {
    return;
  }
  emit("submit", {
    product: { ...localFormData },
    variants: [],
  });
}

function closeModal() {
  emit("close");
  resetForm();
}

function resetForm() {
  localFormData.name = "";
  localFormData.description = "";
  localFormData.priceEtx = 0;
  localFormData.categoryIds = [];
  localFormData.featureIds = [];
  localFormData.colorIds = [];
  localFormData.images = [];
}

function handleFileSelection(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const filesArray = Array.from(target.files);
    localFormData.images.push(...filesArray);
  }
}

function removeImage(index: number) {
  localFormData.images.splice(index, 1);
}

const loading = computed(() => props.loading || false);
const submitError = computed(() => errors.value?.submit); 

const submitLabel = computed(
  () => props.submitLabel || (isEditMode.value ? "Mettre à jour" : "Créer")
);
</script>
