<template>
  <div class="w-64 bg-white p-4 shadow-md">
    <h2 class="text-lg font-bold mb-4">Filtrer les résultats</h2>

    <div class="mt-4">
      <button class="flex justify-between w-full text-left font-semibold py-2" @click="toggleSection('category')">
        Catégories
        <span>{{ isOpen.category ? '−' : '+' }}</span>
      </button>
      <div v-if="isOpen.category" class="ml-4">
        <div v-for="(category, index) in categories" :key="index" class="flex items-center mb-2">
          <input
            type="checkbox"
            :id="'category-' + index"
            class="mr-2"
            v-model="selectedFilters.categories"
            :value="category._id"
            @change="updateFilters"
          />
          <label :for="'category-' + index">
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <button class="flex justify-between w-full text-left font-semibold py-2" @click="toggleSection('size')">
        Tailles
        <span>{{ isOpen.size ? '−' : '+' }}</span>
      </button>
      <div v-if="isOpen.size" class="ml-4">
        <div v-for="(size, index) in sizes" :key="index" class="flex items-center mb-2">
          <input
            type="checkbox"
            :id="'size-' + index"
            class="mr-2"
            v-model="selectedFilters.sizes"
            :value="size._id"
            @change="updateFilters"
          />
          <label :for="'size-' + index">{{ size.name }}</label>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <button class="flex justify-between w-full text-left font-semibold py-2" @click="toggleSection('color')">
        Couleurs
        <span>{{ isOpen.color ? '−' : '+' }}</span>
      </button>
      <div v-if="isOpen.color" class="ml-4">
        <div v-for="(color, index) in colors" :key="index" class="flex items-center mb-2">
          <input
            type="checkbox"
            :id="'color-' + index"
            class="mr-2"
            v-model="selectedFilters.colors"
            :value="color._id"
            @change="updateFilters"
          />
          <label :for="'color-' + index">
            {{ color.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "../stores/modules/product.store";

const emit = defineEmits(['update-filters']);

const productStore = useProductStore();

const categories = ref(productStore.categories);
const colors = ref(productStore.colors);
const sizes = ref(productStore.sizes);

const isOpen = ref({
  size: true,
  color: true,
  category: true,
});

const selectedFilters = ref({
  sizes: [],
  colors: [],
  categories: [],
});

type Section = 'size' | 'color' | 'category';

const toggleSection = (section: Section) => {
  isOpen.value[section] = !isOpen.value[section];
};

const updateFilters = () => {
  emit('update-filters', selectedFilters.value);
};
</script>

<style scoped>
.w-64 {
  width: 16rem;
}
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>