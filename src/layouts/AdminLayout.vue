<template>
  <div class="admin-layout box-border">
    <NavBarAdmin />
    <main class="box-border min-h-[calc(100vh_-_120px)] container mx-auto">
      <div v-if="isAdminDashboard" class="flex gap-x-10 py-8">
        <div>
          <AdminSideBar />
        </div>
        <div class="flex-1">
          <router-view />
        </div>
      </div>
      <div v-else>
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import NavBarAdmin from "../components/layout/NavBarAdmin.vue";
import Footer from "../components/layout/Footer.vue";
import AdminSideBar from "../components/layout/AdminSideBar.vue";

const router = useRouter();

const isAdminDashboard = computed(() => {
  const path = router.currentRoute.value.path;
  return path.includes("admin");
});
</script>