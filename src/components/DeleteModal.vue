<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
  >
    <transition name="modal" appear>
      <div class="relative bg-white rounded-sm shadow-lg max-w-md w-full p-5">
        <div class="flex justify-between items-center border-b pb-2 mb-4">
          <h3 class="text-lg font-semibold">
            <slot name="title">Confirmer la suppression</slot>
          </h3>
          <button
            type="button"
            class="text-gray-400 hover:bg-quaternary hover:text-white"
            @click="close"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div class="text-sm text-gray-500 mb-6">
          <slot name="body">
            Êtes-vous sûr de vouloir continuer la suppression ? Cette action est
            irréversible.
          </slot>
        </div>

        <div class="flex justify-end space-x-3">
          <BaseButton
            label="Annuler"
            classes="border-quaternary rounded-sm hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300"
            @click="close"
          />

          <BaseButton
            label="Supprimer"
            :loading="loading"
            classes="text-white bg-red-600 rounded-sm hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            @click="confirm"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

import BaseButton from "./form/BaseButton.vue";

defineProps<{
  isOpen: boolean;
  close: () => void;
  confirm: () => void;
  loading?: boolean;
}>();
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
