<template>
  <div class="flex h-screen">
    <AdminSidebar />
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from "./AdminSideBar.vue";
</script>
