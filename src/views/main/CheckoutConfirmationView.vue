<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
      <div class="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 11l3 3L22 4M5 12l5 5L19 7"
          ></path>
        </svg>
      </div>
      <h2 class="text-xl font-semibold text-gray-900">Paiement réussi !</h2>
      <p class="mt-4 text-gray-600">
        Votre paiement a été traité avec succès. Merci pour votre commande.
      </p>
      <p>Un mail vous a été envoyé avec le récapitulatif de votre commande.</p>
      <div class="mt-6">
        <button
          @click="goHome"
          class="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push({ name: "homepage" });
};
</script>
