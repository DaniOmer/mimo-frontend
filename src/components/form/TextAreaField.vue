<template>
    <div class="w-full mt-3">
      <label
        v-if="label"
        :for="name"
        class="block text-sm font-medium text-primary"
      >
        {{ label }}
      </label>
      <textarea
        :id="name"
        v-model="model"
        :placeholder="placeholder"
        :rows="rows"
        class="block w-full rounded-md border mt-1 px-3 py-2 border-tertiary shadow-sm focus:outline-quaternary sm:text-sm"
        :class="{
          'border-red-500 focus:ring-red-500 focus:border-red-500': error,
        }"
      ></textarea>
      <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from "vue";
  
  const model = defineModel<string>();
  
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
    placeholder: {
      type: String,
      required: false,
    },
    rows: {
      type: Number,
      default: 3,
    },
    error: {
      type: String,
      required: false,
    },
  });
  </script>
  