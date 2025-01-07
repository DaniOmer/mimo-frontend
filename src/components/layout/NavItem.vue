<template>
  <li :class="computedClasses">
    <RouterLink :to="resolvedTo">
      <slot />
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const resolvedTo = computed(() => {
  if (typeof props.to === "string") {
    return props.to;
  }
  return props.to;
});

const isCurrentRoute = computed(() => {
  if (typeof resolvedTo.value === "string") {
    return route.path === resolvedTo.value;
  }

  return route.name === resolvedTo.value.name;
});

const computedClasses = computed(() =>
  [
    "list-none text-primary text-sm py-2 uppercase cursor-pointer",
    props.isActive ? "font-bold underline" : "hover:text-quaternary",
    isCurrentRoute.value ? "font-semibold text-quaternary" : "",
  ].join(" ")
);
</script>
