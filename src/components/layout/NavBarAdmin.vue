<template>
  <div class="h-[60px]">
    <nav class="flex justify-between items-center container mx-auto px-4 py-2">
      <ul class="flex gap-x-6 items-center">
        <li>
          <NavItem :to="{ name: 'adminProducts' }">Produits</NavItem>
        </li>
        <li>
          <NavItem :to="{ name: 'adminOrders' }">Commandes</NavItem>
        </li>
        <li>
          <NavItem :to="{ name: 'adminUsers' }">Utilisateurs</NavItem>
        </li>
        <li>
          <NavItem :to="{ name: 'adminSettings' }">Paramètres</NavItem>
        </li>
      </ul>

      <ul class="flex justify-center items-center flex-grow">
        <li>
          <NavItem :to="{ name: 'userPersonnalInfos' }">
            <p class="text-2xl text-quaternary font-tertiary font-bold uppercase tracking-widest">
              Admin Mimo
            </p>
          </NavItem>
        </li>
      </ul>

      <ul class="flex gap-x-4 items-center">
        <li>
          <button
            class="text-red-500 text-sm py-2 px-4 uppercase cursor-pointer hover:bg-red-700 rounded-md transition-all"
            @click.prevent="handleLogout"
          >
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import NavItem from "./NavItem.vue";
import { useAuthStore } from "../../stores";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "homepage" });
};
</script>

<style scoped>
.navbar-item {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.navbar-item:hover {
  background-color: #333;
  transform: scale(1.05);
}

button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

.text-2xl {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffcc00;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul:first-child {
  gap: 1.5rem;
}

nav ul:last-child {
  gap: 1rem;
}
</style>