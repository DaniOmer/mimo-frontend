<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
  >
    <transition name="modal" appear>
      <div class="relative bg-white rounded-sm shadow-lg max-w-md w-full p-5">
        <div class="flex justify-between items-center border-b pb-2 mb-4">
          <h3 class="text-lg font-semibold">
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 hover:bg-quaternary hover:text-white"
            @click="onCancel"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div class="text-sm text-gray-500 mb-6">
          {{ message }}
        </div>
        <p v-if="submitError" class="text-red-600">{{ submitError }}</p>
        <div class="flex justify-end gap-4">
          <BaseButton
            :label="cancelText || 'Annuler'"
            classes="border-quaternary rounded-sm hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300"
            @click="onCancel"
          />

          <BaseButton
            :label="confirmText || 'Supprimer'"
            :loading="loading"
            classes="text-white bg-red-600 rounded-sm hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            @click="onConfirm"
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
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  submitError?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "close"): void;
}>();

function onConfirm() {
  emit("confirm");
}

function onCancel() {
  emit("close");
}
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
