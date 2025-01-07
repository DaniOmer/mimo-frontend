<!-- src/components/NavItem.vue -->
<template>
  <li :class="computedClasses">
    <RouterLink :to="resolvedTo" class="flex items-center">
      <!-- Affichage de l'icône si fournie -->
      <component
        v-if="icon"
        :is="icon"
        class="w-5 h-5 mr-3"
        aria-hidden="true"
      />
      <span>{{ label }}</span>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { useRoute, RouteLocationRaw } from "vue-router";
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { Component } from "vue";

const props = defineProps<{
  to: RouteLocationRaw;
  label: string;
  icon?: Component; 
}>();

const emit = defineEmits<{
  (e: "update:activeTab", tabName: string): void;
}>();

const route = useRoute();

const resolvedTo = computed(() => props.to);

const isCurrentRoute = computed(() => {
  if (typeof resolvedTo.value === "string") {
    return route.path === resolvedTo.value;
  } else {
    if (
      "name" in resolvedTo.value &&
      typeof resolvedTo.value.name === "string"
    ) {
      return route.name === resolvedTo.value.name;
    }
    return false;
  }
});

const computedClasses = computed(() =>
  [
    "flex items-center text-primary text-sm py-2 uppercase cursor-pointer",
    isCurrentRoute.value
      ? "font-semibold text-quaternary"
      : "hover:text-quaternary",
  ].join(" ")
);
</script>
