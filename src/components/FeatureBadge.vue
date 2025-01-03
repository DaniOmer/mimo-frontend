<template>
  <span
    class="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded-full"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>