<template>
  <div class="flex flex-col h-screen">
    <NavBarAdmin />
    
    <div class="flex flex-1">
      <AdminSidebar />
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from "./AdminSideBar.vue";
import NavBarAdmin from "../../components/layout/NavBarAdmin.vue";
import Footer from "../../components/layout/Footer.vue";
</script>
