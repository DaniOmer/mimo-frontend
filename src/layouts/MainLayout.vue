<template>
  <div class="main-layout box-border">
    <Navbar />
    <main class="box-border min-h-[calc(100vh_-_120px)] container mx-auto">
      <div v-if="isUserDashboard" class="flex gap-x-10 py-8">
        <div>
          <MainLayoutSideBar />
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

import Navbar from "../components/layout/NavBar.vue";
import Footer from "../components/layout/Footer.vue";
import MainLayoutSideBar from "../components/layout/MainLayoutSideBar.vue";

const router = useRouter();

const isUserDashboard = computed(() => {
  const path = router.currentRoute.value.path;
  return path.includes("myaccount");
});
</script>
