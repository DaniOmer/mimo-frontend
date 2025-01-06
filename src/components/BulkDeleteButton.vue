<template>
  <button
    class="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    @click="$emit('click')"
  >
    <TrashIcon class="w-5 h-5 mr-2" />
    <span>({{ count }})</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  count: number;
}>();
</script>

