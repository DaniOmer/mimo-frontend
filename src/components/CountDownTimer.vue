<template>
  <div v-if="remainingTime > 0">
    <span class="text-gray-600 font-bold text-base">{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  expireAt: {
    type: Date,
    required: true,
  },
});

const expireDate = new Date(props.expireAt);

const remainingTime = ref(expireDate.getTime() - new Date().getTime());

const formattedTime = computed(() => {
  const minutes = Math.floor((remainingTime.value % 3600000) / 60000);
  const seconds = Math.floor((remainingTime.value % 60000) / 1000);

  return `${minutes}m ${seconds}s`;
});

onMounted(() => {
  setInterval(() => {
    remainingTime.value = expireDate.getTime() - new Date().getTime();
  }, 1000);
});

watch(remainingTime, (newTime) => {
  if (newTime <= 0) {
    remainingTime.value = 0;
  }
});

watch(
  () => props.expireAt,
  (newExpireAt) => {
    expireDate.setTime(new Date(newExpireAt).getTime());
    remainingTime.value = expireDate.getTime() - new Date().getTime();
  }
);
</script>
