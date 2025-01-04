<template>
  <nav class="flex border-b border-gray-200">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="setActiveTab(tab.name)"
      :class="[
        'px-4 py-2 min-w-32 -mb-px font-semibold text-sm',
        activeTab === tab.name
          ? 'border-b-2 border-primary text-primary'
          : 'text-gray-600 hover:text-primary',
      ]"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

interface Tab {
  name: string;
  label: string;
}

const props = defineProps<{
  tabs: Tab[];
  initialTab?: string;
}>();

const emit = defineEmits<{
  (e: "update:activeTab", tabName: string): void;
}>();

const activeTab = ref<string>(props.initialTab || props.tabs[0]?.name || "");

function setActiveTab(tabName: string) {
  activeTab.value = tabName;
  emit("update:activeTab", tabName);
}
</script>

