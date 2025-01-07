<template>
  <div
    class="space-y-10 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
  >
    <p class="text-xl font-semibold text-gray-900">Détail du panier</p>
    <div class="space-y-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-4">
          <div class="text-base font-normal text-gray-500">Total HT</div>
          <div class="text-base font-medium text-gray-900">{{ totalHT }} €</div>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div class="text-base font-normal text-gray-500">TVA (20%)</div>
          <div class="text-base font-medium text-gray-900">{{ tva }} €</div>
        </div>
      </div>

      <div
        class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2"
      >
        <div class="text-base font-bold text-gray-900">
          Total <span class="text-xs font-normal">TVA incluse</span>
        </div>
        <div class="text-base font-bold text-gray-900">{{ total }} €</div>
      </div>
    </div>
    <BaseButton type="submit" label="Commander" @click="handleOrderSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseButton from "./form/BaseButton.vue";

const props = defineProps<{
  totalHT: number;
  tva: number;
  total: number;
  handleOrderSubmit: () => void;
}>();

const totalHT = ref(props.totalHT);

watch(
  () => props.totalHT,
  (newTotalHT) => {
    totalHT.value = newTotalHT;
  }
);
</script>
