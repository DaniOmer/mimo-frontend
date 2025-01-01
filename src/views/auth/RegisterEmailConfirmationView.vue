<template>
  <div class="container mx-auto mt-20 border rounded-sm">
    <div class="w-full max-w-3xl mx-auto pb-10">
      <div v-if="status === 'pending'" class="flex justify-center">
        <div role="status" class="max-w-sm w-full animate-pulse">
          <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
          <span class="sr-only">Chargement en cours...</span>
        </div>
      </div>
      <div v-else-if="status === 'failed'" class="p-4 text-center text-red-500">
        <h3 class="mb-4 font-medium">
          Une erreur s'est produite lors de la validation de votre adresse
          email.
        </h3>
        <p class="text-sm">Veuillez réessayer ou contacter notre support.</p>
        <div class="mt-10 flex justify-center">
          <RouterLink :to="{ name: 'homepage' }">
            <span
              class="px-4 py-2 text-black text-sm border border-primary rounded-md bg-transparent hover:bg-primary hover:text-white transition ease-in-out delay-75"
            >
              Retour à l'accueil
            </span>
          </RouterLink>
        </div>
      </div>
      <div v-else class="p-4 text-center">
        <h3 class="mb-4 font-medium">
          Votre adresse mail a été validée avec succès !
        </h3>
        <p class="text-sm">
          Vous pouvez dès à présent vous connecter pour profiter de nos
          nombreuses offres.
        </p>
        <div class="mt-10 flex justify-center">
          <RouterLink :to="{ name: 'homepage' }">
            <span
              class="px-4 py-2 text-sm border border-primary rounded-md bg-transparent hover:bg-primary hover:text-white transition ease-in-out delay-75"
            >
              Se connecter
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { toRefs, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../../stores";

const authStore = useAuthStore();
const { status } = toRefs(authStore);

const props = defineProps<{
  token: string;
}>();

onMounted(async () => {
  try {
    await authStore.verifyEmail({ token: props.token });
  } catch (err) {
    console.error("Erreur lors de la vérification :", err);
  }
});

onUnmounted(() => {
  authStore.resetStatus();
});
</script>
