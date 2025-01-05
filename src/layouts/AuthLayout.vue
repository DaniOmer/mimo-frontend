<template>
  <div class="auth-layout">
    <header class="h-[60px] py-2">
      <nav class="flex justify-center px-4 items-center">
        <ul class="list-none">
          <NavItem :to="{ name: 'homepage' }">
            <p
              class="text-2xl text-quaternary font-tertiary font-bold uppercase tracking-widest"
            >
              Mimo
            </p>
          </NavItem>
        </ul>
      </nav>
    </header>
    <main class="min-h-[calc(100vh_-_60px)] px-2 lg:px-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavItem from "../components/layout/NavItem.vue";
import Footer from "../components/layout/Footer.vue";
</script>
