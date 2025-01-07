<!-- src/components/admin/product/ProductFormModal.vue -->
<template>
  <BaseModal :isOpen="visible" :close="onClose">
    <template v-slot:header>
      <h2 class="text-lg font-semibold">
        {{ isEditMode ? "Modifier le Produit" : "Créer un Produit" }}
      </h2>
    </template>

    <template v-slot:body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Nom du Produit -->
        <InputField
          v-model="localProductData.name"
          name="name"
          label="Nom"
          placeholder="Saisir le nom du produit"
          :error="errors.name"
        />

        <!-- Description du Produit -->
        <TextAreaField
          v-model="localProductData.description"
          name="description"
          label="Description"
          placeholder="Saisir la description du produit"
          :error="errors.description"
          :rows="4"
        />

        <InputField
          v-model.number="localProductData.priceEtx"
          name="priceEtx"
          label="Prix HT"
          type="number"
          placeholder="Saisir le prix HT"
          :error="errors.priceEtx"
        />

        <div class="flex flex-col mt-4">
          <FilterSelect
            v-model="localProductData.categoryIds"
            :options="categoryOptions"
            placeholder="Sélectionner des catégories"
            :isMultiple="true"
          />
          <p v-if="errors.categoryIds" class="mt-1 text-sm text-red-600">
            {{ errors.categoryIds }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <FilterSelect
            v-model="localProductData.featureIds"
            :options="featureOptions"
            placeholder="Sélectionner des fonctionnalités"
            :isMultiple="true"
          />
          <p v-if="errors.featureIds" class="mt-1 text-sm text-red-600">
            {{ errors.featureIds }}
          </p>
        </div>

        <div class="flex items-center mt-4">
          <input
            type="checkbox"
            id="hasVariants"
            v-model="localProductData.hasVariants"
            class="mr-2"
          />
          <label for="hasVariants" class="text-sm">Ajouter des variantes</label>
        </div>

        <ProductVariantForm
          v-if="localProductData.hasVariants"
          :variants="localProductData.variants"
          :sizeOptions="sizeOptions"
          :colorOptions="colorOptions"
          :variantsError="errors.variants"
          @update:variants="updateVariants"
        />

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
import TextAreaField from "../../../../components/form/TextAreaField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import BaseModal from "../../../../components/BaseModal.vue";
import FilterSelect from "../../../../components/FilterSelect.vue";
import ProductVariantForm from "./ProductVariantForm.vue";
import { productFormSchema } from "../../../schema/product.schema";
import { IProduct } from "../../../../api/product/product.types";

interface Variant {
  _id?: string;
  sizeId: string | number | null;
  colorId: string | number | null;
  priceEtx: number;
  weight?: number;
}

interface ProductFormData {
  name: string;
  description: string;
  priceEtx: number;
  hasVariants: boolean;
  isActive?: boolean;
  categoryIds: string[];
  featureIds: string[];
}

const props = defineProps<{
  visible: boolean;
  productData?: Partial<IProduct>;
  submitLabel?: string;
  loading?: boolean;
  sizeOptions: { label: string; value: string | number }[];
  colorOptions: { label: string; value: string | number }[];
  categoryOptions: { label: string; value: string | number }[];
  featureOptions: { label: string; value: string | number }[];
}>();


const emit = defineEmits<{
  (e: "submit", data: { product: ProductFormData; variants: Variant[] }): void;
  (e: "close"): void;
}>();

const isEditMode = computed(() => !!props.productData);
const { errors, validate } = useFormValidation(productFormSchema);

const localProductData = reactive<ProductFormData & { variants: Variant[] }>({
  name: props.productData?.name || "",
  description: props.productData?.description || "",
  priceEtx: props.productData?.priceEtx || 0,
  hasVariants: props.productData?.hasVariants || false,
  categoryIds: props.productData?.categoryIds || [],
  featureIds: props.productData?.featureIds || [],
  variants: props.productData?.variants
    ? props.productData.variants.map((v) => ({
        _id: v?._id,
        sizeId: v.sizeId,
        colorId: v.colorId,
        priceEtx: v.priceEtx,
      }))
    : [],
});

const handleSubmit = () => {
  const isValid = validate({
    name: localProductData.name,
    description: localProductData.description,
    priceEtx: localProductData.priceEtx,
    categoryIds: localProductData.categoryIds,
    featureIds: localProductData.featureIds,
    hasVariants: localProductData.hasVariants,
    variants: localProductData.variants,
  });

  if (!isValid) {
    return;
  }

  const {
    name,
    description,
    priceEtx,
    categoryIds,
    featureIds,
    hasVariants,
    variants,
  } = localProductData;

  const product: ProductFormData = {
    name: String(name),
    description: String(description),
    priceEtx: Number(priceEtx),
    categoryIds: categoryIds.map(String),
    featureIds: featureIds.map(String),
    hasVariants: Boolean(hasVariants),
    isActive: true,
  };

  const variantsData = hasVariants
    ? variants.map((v) => ({ ...v, weight: 100 }))
    : [];

  emit("submit", { product, variants: variantsData });
};

const onClose = () => {
  emit("close");
  resetLocalData();
};

const resetLocalData = () => {
  localProductData.name = "";
  localProductData.description = "";
  localProductData.priceEtx = 0;
  localProductData.hasVariants = false;
  localProductData.variants = [];
  localProductData.categoryIds = [];
  localProductData.featureIds = [];
};

const updateVariants = (updatedVariants: Variant[]) => {
  localProductData.variants = updatedVariants;
};

watch(
  () => props.productData,
  (newVal) => {
    if (newVal) {
      localProductData.name = newVal.name || "";
      localProductData.description = newVal.description || "";
      localProductData.priceEtx = newVal.priceEtx || 0;
      localProductData.hasVariants = newVal.hasVariants || false;
      localProductData.variants = newVal.variants
        ? newVal.variants.map((v) => ({
            _id: v?._id,
            sizeId: v.sizeId,
            colorId: v.colorId,
            priceEtx: v.priceEtx,
            weight: 100,
          }))
        : [];
      localProductData.categoryIds = newVal.categoryIds || [];
      localProductData.featureIds = newVal.featureIds || [];
    } else {
      resetLocalData();
    }
  },
  { immediate: true }
);

const submitLabel = computed(
  () => props.submitLabel || (isEditMode.value ? "Mettre à jour" : "Créer")
);
</script>
