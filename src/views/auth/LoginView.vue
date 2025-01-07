<template>
  <div class="mt-10">
    <div class="min-w-[300px] md:w-1/2 lg:w-1/3 mx-auto">
      <div class="mb-6">
        <h1 class="text-base mx-auto w-fit">Bienvenue chez Mimo</h1>
        <p class="mx-auto w-fit text-sm text-primary">
          Renseignez votre adresse mail et votre mot de passe pour accéder à
          votre compte..
        </p>
      </div>
      <div>
        <LoginForm
          :initialFormData="formData"
          :loading="status === 'pending'"
          :submitError="error"
          @submit="handleFormSubmit"
        />
        <p class="flex justify-center text-sm mt-2">
          Vous n'avez pas de compte ?
          <RouterLink :to="{ name: 'register' }">
            <p
              class="block ml-3 text-blue-700 hover:underline-offset-8 transition ease-in-out delay-75"
            >
              S'inscrire
            </p>
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import { useAuthStore } from "../../stores";
import LoginForm from "../../forms/modules/auth/LoginForm.vue";
import { ILoginFormData } from "../../forms/modules/auth/LoginForm.vue";
import { useUserPreferenceStore } from "../../stores/modules/userPreference.store";

const router = useRouter();
const authStore = useAuthStore();
const { error, status } = toRefs(authStore);
const userPreferenceStore = useUserPreferenceStore();
const { error: userPreferenceError } = toRefs(userPreferenceStore);
const $toast = useToast();

const formData = ref({
  email: "",
  password: "",
});

const handleFormSubmit = async (data: ILoginFormData) => {
  await authStore.login(data);
  if (authStore.isAuthenticated) {
    await userPreferenceStore.fetchUserPreference();
    if (userPreferenceError.value) {
      console.error(
        "Erreur lors de la récupération des préférences utilisateur",
        userPreferenceError.value
      );
    }
    $toast.success("Connexion réussie", {
      position: "top-right",
      duration: 3000,
    });
    router.push({ name: "homepage" });
  }
};

onUnmounted(() => {
  authStore.resetStatus();
});
</script>
