<template>
  <div 
    class="card-product bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all transform hover:-translate-y-1 cursor-pointer"
    @click="$emit('click')"
  >
    <div class="h-48 relative">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <span v-if="isActive" class="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Disponible</span>
      <span v-else class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Indisponible</span>
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
      <p class="text-primary font-bold mt-2">{{ priceVat }} €</p>
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
  priceVat: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>

