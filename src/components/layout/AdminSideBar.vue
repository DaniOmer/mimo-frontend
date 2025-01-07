<template>
  <aside class="w-52 h-full xl:w-60 border-r border-gray-200">
    <nav class="flex flex-col gap-6 p-4">
      <div>
        <h2 class="text-lg font-semibold text-primary mb-2">Administration</h2>
        <ul class="flex flex-col gap-y-2">
          <NavItem
            :to="{ name: 'adminUsers' }"
            label="Utilisateurs"
            :icon="UserIcon"
          />
          <NavItem
            :to="{ name: 'adminProducts' }"
            label="Produits"
            :icon="CubeIcon"
          />
          <NavItem
            :to="{ name: 'adminOrders' }"
            label="Commandes"
            :icon="ClipboardIcon"
          />
          <NavItem
            :to="{ name: 'adminReports' }"
            label="Rapports"
            :icon="ChartBarIcon"
          />
        </ul>
      </div>

      <div>
        <h2 class="text-lg font-semibold text-primary mb-2">Paramètres</h2>
        <ul class="flex flex-col gap-y-2">
          <NavItem
            :to="{ name: 'adminSettings' }"
            label="Paramètres"
            :icon="CogIcon"
          />
          <NavItem
            :to="{ name: 'adminLogs' }"
            label="Logs"
            :icon="DocumentTextIcon"
          />
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import NavItem from "./NavAdminItem.vue";
import {
  UserIcon,
  CubeIcon,
  ClipboardIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";
</script>
@