<template>
  <div class="relative flex items-center">
    <input
      v-model="inputValue"
      :placeholder="placeholder"
      @keyup.enter="handleSearch"
      class="w-full p-2 pr-16 pl-10 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-tertiary"
    />
    
    <MagnifyingGlassIcon
      width="20"
      height="20"
      class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
    />
    
    <button
      v-if="showSearchButton"
      @click="handleSearch"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition focus:outline-none"
    >
      Rechercher
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Rechercher...',
  },
  showSearchButton: {
    type: Boolean,
    default: false,
  },
  searchMode: {
    type: String,
    default: 'front',
  },
});

const emits = defineEmits(['update:modelValue', 'search']);

const inputValue = ref(props.modelValue);

watch(inputValue, (newVal) => {
  emits('update:modelValue', newVal);
  if (props.searchMode === 'front') {
    emits('search', newVal);
  }
});

const handleSearch = () => {
  emits('search', inputValue.value);
};
</script>

