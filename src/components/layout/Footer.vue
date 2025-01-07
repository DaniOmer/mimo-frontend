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
          <router-link
            to="/about"
            class="hover:underline me-4 md:me-6"
          >
            À propos
          </router-link>
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
          <a href="#" class="hover:underline me-4 md:me-6">Contact</a>
        </li>
        <li>
          <a href="#" class="hover:underline" @click.prevent="showCookieModal"
            >Cookies</a
          >
          <router-link
            to="/contact"
            class="hover:underline me-4 md:me-6"
          >
            Contact
          </router-link>
        </li>
      </ul>
    </div>
    <CookieModal :isOpen="isModalOpen" :close="closeCookieModal" />
  </footer>
</template>

<script setup lang="ts">
import { useModal } from "../../composables/useModal";
import CookieModal from "../../components/CookieModal.vue";

const { isOpen: isModalOpen, open: showCookieModal, close: closeCookieModal } = useModal();
</script>
