<template>
  <button
    :type="type"
    :class="computedClasses"
    :disabled="loading"
    @click="handleClick"
  >
    <span v-if="!loading">{{ label }}</span>
    <span v-else class="flex items-center justify-center space-x-2">
      <svg
        class="w-5 h-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="animate-pulse">Chargement...</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};

const computedClasses = computed(() =>
  [
    "border text-sm px-5 py-2.5 text-center transition ease-in delay-75",
    props.classes
      ? props.classes
      : "w-full rounded-md text-white bg-primary hover:bg-transparent hover:border-primary hover:text-primary",
  ].join(" ")
);
</script>
