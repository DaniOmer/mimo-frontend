<!-- src/pages/admin/AdminPage.vue -->
<template>
  <div class="p-6">
    <AdminSubNavigation
      :tabs="tabs"
      :initialTab="activeTab"
      @update:activeTab="activeTab = $event"
    />

    <div class="mt-6">
      <AdminCategory v-if="activeTab === 'category'" />
      <!-- Ajoutez d'autres composants pour les autres onglets ici -->
      <!-- Exemple :
        <AdminProduct v-else-if="activeTab === 'product'" />
        <AdminSize v-else-if="activeTab === 'size'" />
        <AdminColor v-else-if="activeTab === 'color'" />
        -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminSubNavigation from "../../../components/AdminSubNavigation.vue";
import AdminCategory from "./AdminCategory.vue";
// Importez d'autres composants selon les onglets

// Définir les onglets disponibles
const tabs = [
  { name: "product", label: "Product" },
  { name: "category", label: "Category" },
  { name: "size", label: "Size" },
  { name: "color", label: "Color" },
  // Ajoutez d'autres onglets selon vos besoins
];

// État pour l'onglet actif
const activeTab = ref("category"); // Onglet par défaut
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
