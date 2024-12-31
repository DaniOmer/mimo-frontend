<!-- src/components/Navbar.vue -->
<template>
  <div class="h-[60px]">
    <nav class="flex justify-between py-2">
      <div class="flex justify-between items-center lg:w-1/2">
        <div>
          <ul class="flex gap-x-2">
            <NavItem :to="{ name: 'homepage' }">Tous</NavItem>
            <NavItem :to="{ name: 'homepage' }">Nouveautés</NavItem>
            <NavItem :to="{ name: 'catalog' }">Collections</NavItem>
          </ul>
        </div>

        <div>
          <a href="/">
            <p
              class="text-2xl text-quaternary font-tertiary font-bold uppercase tracking-widest"
            >
              Mimo
            </p>
          </a>
        </div>
      </div>

      <div class="flex gap-x-10">
        <NavItem :to="{ name: 'homepage' }">Panier (0)</NavItem>

        <div class="flex">
          <NavItem :to="{ name: 'register' }">Inscription</NavItem>
          <NavItem :to="{ name: 'homepage' }">Connexion</NavItem>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import NavItem from "./NavItem.vue";
</script>
