<template>
  <div></div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toast-notification";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["success", "error"].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
});

const $toast = useToast();

if (props.type === "success") {
  $toast.success(props.message, { position: "top", duration: 3000 });
} else if (props.type === "error") {
  $toast.error(props.message, { position: "top", duration: 3000 });
}
</script>
