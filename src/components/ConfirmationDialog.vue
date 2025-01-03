<template>
  <Modal :visible="visible" @close="onCancel" :title="title">
    <p class="mb-6">{{ message }}</p>
    <div class="flex justify-end gap-4">
      <!-- Bouton d'annulation -->
      <button
        @click="onCancel"
        class="px-4 py-2 border border-primary text-primary bg-white rounded hover:bg-primary hover:text-white transition"
      >
        {{ cancelText || "Annuler" }}
      </button>

      <!-- Bouton de confirmation -->
      <button
        @click="onConfirm"
        class="px-4 py-2 text-white bg-primary border border-transparent rounded hover:bg-transparent hover:border-primary hover:text-primary transition"
      >
        {{ confirmText || "Confirmer" }}
      </button>
    </div>
  </Modal>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

function onConfirm() {
  emit("confirm");
}

function onCancel() {
  emit("cancel");
}
</script>

