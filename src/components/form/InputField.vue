<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border px-3 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      :class="{
        'border-red-500 focus:ring-red-500 focus:border-red-500': error,
      }"
    />
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const model = defineModel();

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
});
</script>
