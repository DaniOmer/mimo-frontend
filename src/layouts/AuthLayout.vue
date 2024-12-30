<template>
  <div class="auth-layout">
    <main class="min-h-[calc(100vh_-_60px)]">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "../components/layout/Footer.vue";
</script>
