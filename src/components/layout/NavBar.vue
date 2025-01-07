<template>
  <div class="h-[60px]">
    <nav class="flex justify-between items-center container mx-auto">
      <ul class="flex justify-between items-center gap-x-3">
        <NavItem :to="{ name: 'homepage' }">Tous</NavItem>
        <NavItem :to="{ name: 'homepage' }">Nouveautés</NavItem>
        <NavItem :to="{ name: 'catalog' }">Collections</NavItem>
      </ul>

      <ul class="flex justify-between items-center">
        <NavItem :to="{ name: 'homepage' }">
          <p
            class="text-2xl text-quaternary font-tertiary font-bold uppercase tracking-widest"
          >
            Mimo
          </p>
        </NavItem>
      </ul>

      <ul class="flex justify-between items-center gap-x-3">
        <NavItem :to="{ name: 'cart' }"
          >Panier ({{ items ? items.length : 0 }})</NavItem
        >
        <div
          v-if="!authStore.isAuthenticated"
          class="flex justify-between items-center gap-x-3"
        >
          <NavItem :to="{ name: 'register' }">Inscription</NavItem>
          <NavItem :to="{ name: 'login' }">Connexion</NavItem>
        </div>
        <div v-else class="flex">
          <NavItem :to="{ name: 'userPersonnalInfos' }">COMPTE</NavItem>
          <button
            class="text-primary text-sm py-2 px-4 uppercase cursor-pointer"
            @click.prevent="handleLogout"
          >
            Déconnexion
          </button>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from "vue";

import { useRouter } from "vue-router";

import NavItem from "./NavItem.vue";

import { useAuthStore } from "../../stores";
import { useCartStore } from "../../stores/modules/cart.store";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { items } = toRefs(cartStore);

watch(
  () => cartStore.items,
  (newItems) => {
    items.value = newItems;
  },
  { deep: true }
);

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "homepage" });
};
</script>
