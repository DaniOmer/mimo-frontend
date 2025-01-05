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
      v-model="internalValue"
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
import { ref, watch } from "vue";
import { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, null, undefined] as PropType<
      string | number | boolean | null | undefined
    >,
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

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean | null | undefined): void;
}>();

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

watch(
  internalValue,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);
</script>