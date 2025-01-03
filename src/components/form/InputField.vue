<template>
  <div class="w-full mt-3">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-primary"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="block w-full rounded-md border mt-1 px-3 py-2 border-tertiary shadow-sm focus:outline-quaternary sm:text-sm"
      :class="{
        'border-red-500 focus:ring-red-500 focus:border-red-500': error,
      }"
    />
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
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
