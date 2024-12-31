<template>
  <div
    class="card-product bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
  >
    <div class="aspect-square">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="p-4">
      <h3
        class="text-lg font-semibold text-gray-700 truncate"
        :title="title"
      >
        {{ title }}
      </h3>
      <p v-if="description" class="text-gray-500 mt-2 text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>
