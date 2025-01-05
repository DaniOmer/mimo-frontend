<template>
  <div>
    <label class="flex items-center space-x-2">
      <input
        v-model="internalValue"
        :name="name"
        @input="handleInput"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-quaternary accent-quaternary text-xl"
      />
      <span class="text-sm text-gray-700">{{ label }}</span>
    </label>
    <p v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  label: string;
  name: string;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>
