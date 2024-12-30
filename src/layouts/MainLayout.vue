<template>
  <div class="main-layout">
    <Navbar />
    <main class="min-h-[calc(100vh_-_120px)]">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/layout/NavBar.vue";
import Footer from "../components/layout/Footer.vue";
</script>
