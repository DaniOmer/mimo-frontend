Modal.vue
<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          @click="close"
          aria-label="Fermer le modal"
        >
          &times;
        </button>

        <h2 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h2>

        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  visible: boolean;
  title?: string;
}>();

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    close();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
