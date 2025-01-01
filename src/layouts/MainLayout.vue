<template>
  <div class="main-layout box-border">
    <Navbar />
    <main
      class="box-border min-h-[calc(100vh_-_120px)] px-2 md:px-4 2xl:container mx-auto"
    >
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/layout/NavBar.vue";
import Footer from "../components/layout/Footer.vue";
</script>
