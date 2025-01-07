<template>
  <nav class="flex border-b border-gray-200">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="setActiveTab(tab.name)"
      :class="[
        'px-4 py-2 min-w-32 -mb-px font-semibold text-sm',
        initialTab === tab.name
          ? 'border-b-2 border-primary text-primary'
          : 'text-gray-600 hover:text-primary',
      ]"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Tab {
  name: string;
  label: string;
}

defineProps<{
  tabs: Tab[];
  initialTab?: string;
}>();

const emit = defineEmits<{
  (e: "update:activeTab", tabName: string): void;
}>();

function setActiveTab(tabName: string) {
  emit("update:activeTab", tabName);
}
</script>
