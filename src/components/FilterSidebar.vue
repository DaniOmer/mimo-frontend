<template>
  <div class="w-full lg:w-64 bg-white p-6 rounded-lg">
    <h2 class="text-2xl font-bold mb-6">Filtrer par</h2>
    <FilterSection
      title="Catégories"
      :items="categories"
      v-model="selectedCategories"
      @update:modelValue="updateFilters"
    />

    <FilterSection
      title="Tailles"
      :items="sizes"
      v-model="selectedSizes"
      @update:modelValue="updateFilters"
    />

    <FilterSection
      title="Couleurs"
      :items="colors"
      v-model="selectedColors"
      @update:modelValue="updateFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FilterSection from "./FilterSection.vue";
import { useProductStore } from "../stores/modules/product.store";

const emit = defineEmits(["update-filters"]);

const productStore = useProductStore();

const categories = ref(productStore.categories);
const sizes = ref(productStore.sizes);
const colors = ref(productStore.colors);

const selectedCategories = ref([]);
const selectedSizes = ref([]);
const selectedColors = ref([]);

const updateFilters = () => {
  emit("update-filters", {
    categoryIds: selectedCategories.value,
    sizeIds: selectedSizes.value,
    colorIds: selectedColors.value,
  });
};
</script>
