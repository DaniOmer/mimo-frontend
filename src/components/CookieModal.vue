<template>
  <BaseModal :isOpen="isOpen" :close="close">
    <template v-slot:header>
      <h2 class="text-lg font-semibold">Gestion des Cookies</h2>
    </template>
    <template v-slot:body>
      <div class="h-auto">
        <p class="text-gray-700 text-center mb-6">
          Nous utilisons des cookies pour améliorer votre expérience utilisateur. 
          En continuant à naviguer sur ce site, vous acceptez notre 
          <a href="/politique-de-confidentialite" class="text-blue-600 underline">
            politique de confidentialité
          </a>.
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="acceptCookies"
            class="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            Accepter
          </button>
          <button
            @click="declineCookies"
            class="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
          >
            Refuser
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../components/BaseModal.vue";

defineProps<{
  isOpen: boolean;
  close: () => void;
}>();

function acceptCookies() {
  setCookie("userConsent", "accepted", 365);
  close();
}

function declineCookies() {
  setCookie("userConsent", "declined", 365);
  close();
}

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
</script>