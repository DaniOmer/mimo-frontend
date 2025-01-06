<template>
  <div>
    <div class="main-image border rounded-lg overflow-hidden">
      <img 
      v-if="currentImage"
      :src="currentImage.url" 
      :alt="currentImage.altText || 'Image principale du produit'" 
      class="w-full object-cover transition-transform duration-300 hover:scale-105 max-h-500px"
      />
    </div>

    <div class="thumbnails flex flex-wrap space-x-2 mt-4">
      <img
        v-for="(image, index) in images"
        :key="image._id"
        :src="image.url"
        :alt="image.altText || 'Miniature ' + (index + 1)"
        class="w-16 h-16 object-cover cursor-pointer rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-110 hover:border-gray-400"
        :class="{ 'border-2 border-gray-700': currentImage.url === image.url }"
        @click="setCurrentImage(image)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { IProductImage } from "../api/product/product.types";

const props = defineProps<{
  images: IProductImage[];
}>();

const currentImage = ref(props.images[0]);

watch(
  () => props.images,
  (newImages) => {
    if (newImages.length > 0) {
      currentImage.value = newImages[0];
    }
  },
  { immediate: true }
);

const setCurrentImage = (image: IProductImage) => {
  currentImage.value = image;
};
</script>