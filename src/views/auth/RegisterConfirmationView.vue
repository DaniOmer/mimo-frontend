<template>
  <div class="container mx-auto mt-20 border rounded-sm">
    <div class="w-full max-w-3xl mx-auto pb-10">
      <div
        class="flex gap-2 text-primary justify-center items-center bg-white py-8 shadow-sm mb-5"
      >
        <span class="block text-5xl">
          <i class="ri-mail-send-line"></i>
        </span>
        <h2 class="font-medium">
          Bienvenue chez
          <span class="text-xl font-bold font-tertiary">Mimo</span>
        </h2>
      </div>
      <div class="p-4 text-center">
        <h3 class="mb-4 font-medium">Votre compte a été créé avec succès !</h3>
        <p class="text-sm">
          Merci de vous être inscrit. Un email de confirmation a été envoyé à
          votre adresse. Veuillez consulter votre boîte de réception pour
          activer votre compte.
        </p>
        <p class="text-sm">
          Si vous ne trouvez pas l'email dans votre boîte principale, vérifiez
          dans vos courriers indésirables.
        </p>
        <div class="mt-10 flex justify-center">
          <RouterLink :to="{ name: 'login' }">
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
import { useAuthStore } from "../../stores";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (authStore.user) {
    authStore.user = null;
  } else {
    router.push({ name: "homepage" });
  }
});
</script>
