<template>
  <footer class="bg-primary h-[60px]">
    <div class="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2024 <a href="https://mimo.com/" class="hover:underline">Mimo</a>.
        Tous droits réservés.
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">À propos</a>
        </li>
        <li>
          <router-link to="/privacy-policy" class="hover:underline me-4 md:me-6">Politique de confidentialité</router-link>
        </li>
        <li>
          <router-link
            to="/terms-and-conditions"
            class="hover:underline me-4 md:me-6"
          >
            CGV
          </router-link>
        </li>
        <li>
          <router-link
            to="/contact"
            class="hover:underline me-4 md:me-6"
          >
            Contact
          </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
