<template>
  <div
    v-if="isOpen"
    id="default-modal"
    tabindex="-1"
    class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-40"
  >
    <transition name="modal" appear>
      <div
        class="bg-white relative overflow-y-hidden w-full max-w-3xl max-h-[75vh] transition-all ease-in delay-200 shadow-md drop-shadow-md min-h-96 pb-10 rounded-sm"
      >
        <div
          class="flex justify-end items-center border-b border-slate-300 py-2.5 px-2 absolute top-0 left-0 right-0 bg-white z-10"
        >
          <button type="button" class="btn-close" @click="close">
            <XMarkIcon class="w-7 h-7 text-primary" />
          </button>
        </div>

        <div class="px-6 overflow-y-auto h-[75vh] py-10">
          <div
            class="flex justify-between items-center font-semibold mt-8 mb-4 text-xl"
          >
            <slot name="header"> This is the default title! </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> This is the default body! </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

defineProps<{
  isOpen: boolean;
  close: () => void;
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
