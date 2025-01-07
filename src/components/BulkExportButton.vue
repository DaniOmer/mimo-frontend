<template>
  <button
    class="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-green-600 transition"
    @click="$emit('click')"
  >
    <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
    <span>({{ count }})</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  count: number;
}>();
</script>

