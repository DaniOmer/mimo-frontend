<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <p class="text-gray-700 text-lg mb-4">{{ description }}</p>
    <p class="text-2xl text-primary font-semibold my-4">{{ price }} €</p>

    <div class="mt-4">
      <label for="size" class="block font-semibold">Taille</label>
      <select id="size" v-model="selectedSize" class="border w-full max-w-xs p-2 mt-2">
        <option v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <div class="mt-4">
      <label class="block font-semibold">Couleurs</label>
      <div class="flex space-x-2 mt-2">
        <button
          v-for="color in colors"
          :key="color.name"
          :style="{ backgroundColor: color.hexCode }"
          class="w-8 h-8 rounded-full border transition-colors duration-300 ease"
          :class="{ 'border-gray-700': selectedColor === color }"
          @click="selectedColor = color"
        ></button>
      </div>
    </div>

    <div class="mt-4">
      <label for="quantity" class="block font-semibold">Quantité</label>
      <input
        id="quantity"
        type="number"
        v-model="quantity"
        min="1"
        class="border w-full max-w-xs p-2 mt-2"
      />
    </div>

    <div class="mt-4">
      <p class="font-semibold">Catégories</p>
      <div class="flex flex-wrap gap-2">
        <FeatureBadge v-for="category in categories" :key="category" :text="category" />
      </div>
    </div>

    <div class="mt-4">
      <p class="font-semibold">Caractéristiques</p>
      <div class="flex flex-wrap gap-2">
        <FeatureBadge v-for="feature in features" :key="feature" :text="feature" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeatureBadge from "./FeatureBadge.vue";
import { ref } from "vue";

defineProps({
  title: String,
  description: String,
  price: Number,
  sizes: Array as () => string[],
  colors: Array as () => { name: string, hexCode: string }[],
  categories: Array as () => string[],
  features: Array as () => string[],
});

const selectedSize = ref<string | null>(null);
const selectedColor = ref<{ name: string; hexCode: string } | null>(null);
const quantity = ref<number>(1);
</script>