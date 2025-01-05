<template>
  <aside class="w-52 w- h-full xl:w-60 mr-10">
    <nav class="flex flex-col gap-4">
      <div>
        <h1 class="text-lg font-semibold">Mon compte</h1>
        <ul class="flex flex-col gap-y-1">
          <NavItem :to="{ name: 'homepage' }">Commandes</NavItem>
          <NavItem :to="{ name: 'userPersonnalInfos' }"
            >Données personnelles</NavItem
          >
          <NavItem :to="{ name: 'userAddress' }">Adresses</NavItem>
          <NavItem :to="{ name: 'homepage' }">Newsletter</NavItem>
        </ul>
      </div>

      <div>
        <h1 class="text-lg font-semibold">Données et confidentialités</h1>
        <ul class="flex flex-col gap-y-3">
          <NavItem :to="{ name: 'homepage' }"
            >Préférences de recommandation</NavItem
          >
          <NavItem :to="{ name: 'homepage' }"
            >Demander ou supprimer des données</NavItem
          >
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import NavItem from "./NavItem.vue";
</script>
@
