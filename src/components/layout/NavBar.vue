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
        <NavItem :to="{ name: 'register' }">Inscription</NavItem>
        <NavItem :to="{ name: 'login' }">Connexion</NavItem>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import NavItem from "./NavItem.vue";
</script>
