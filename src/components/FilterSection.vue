<template>
  <div class="mt-4">
    <button
      class="flex justify-between w-full text-left font-semibold py-2 focus:outline-none"
      @click="toggle"
    >
      {{ title }}
      <span>{{ isOpen ? "−" : "+" }}</span>
    </button>
    <div v-if="isOpen" class="ml-4">
      <div
        v-for="item in items"
        :key="item._id || item.name"
        class="flex items-center mb-2"
      >
        <input
          type="checkbox"
          :id="`${title}-${item._id || item.name}`"
          class="mr-2"
          v-model="selectedItems"
          :value="item._id || item.name"
          @change="updateFilters"
        />
        <label :for="`${title}-${item._id || item.name}`">
          {{ item.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface FilterItem {
  _id: string;
  name: string;
}

const props = defineProps<{
  title: string;
  items: FilterItem[];
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const isOpen = ref(true);
const selectedItems = ref<string[]>([...props.modelValue]);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const updateFilters = () => {
  emit("update:modelValue", selectedItems.value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    selectedItems.value = [...newVal];
  }
);
</script>
