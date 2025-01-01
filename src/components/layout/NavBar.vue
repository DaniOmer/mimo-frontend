<!-- src/components/Navbar.vue -->
<template>
  <header class="h-[60px] py-2">
    <nav class="flex justify-between items-center">
      <ul class="flex justify-between items-center">
        <NavItem :to="{ name: 'homepage' }">Tous</NavItem>
        <NavItem :to="{ name: 'homepage' }">Nouveautés</NavItem>
        <NavItem :to="{ name: 'homepage' }">Collections</NavItem>
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

      <ul class="flex justify-between items-center">
        <NavItem :to="{ name: 'homepage' }">Panier (0)</NavItem>
        <div
          v-if="!authStore.isAuthenticated"
          class="flex justify-between items-center"
        >
          <NavItem :to="{ name: 'register' }">Inscription</NavItem>
          <NavItem :to="{ name: 'login' }">Connexion</NavItem>
        </div>
        <div v-else>
          <button
            class="text-primary text-sm py-2 px-4 uppercase cursor-pointer"
          >
            Compte
          </button>
          <button
            class="text-primary text-sm py-2 px-4 uppercase cursor-pointer"
            @click.prevent="authStore.logout"
          >
            Déconnexion
          </button>
        </div>
        <!-- <div v-else-if="user" class="flex justify-center items-center gap-2">
          <Avatar :user="user" />
          <div class="text-xs">
            <p>{{ user.firstName }} {{ user.lastName }}</p>
            <p>{{ user.email }}</p>
          </div>
        </div> -->
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import NavItem from "./NavItem.vue";
import { useAuthStore } from "../../stores";

const authStore = useAuthStore();
</script>
