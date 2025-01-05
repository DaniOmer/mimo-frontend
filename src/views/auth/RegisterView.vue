<template>
  <div class="mt-10">
    <div class="min-w-[300px] md:w-1/2 lg:w-1/3 mx-auto">
      <div class="mb-6">
        <h1 class="text-base mx-auto w-fit">Bienvenue chez Mimo</h1>
        <p class="mx-auto w-fit text-sm text-primary">
          Rejoignez-nous pour explorer de plus près l'univers du crochet et
          profiter des meilleurs offres sur nos collections de sac tricotés.
        </p>
      </div>
      <div>
        <p v-if="error" class="text-red-600">{{ error }}</p>
        <RegisterForm
          :initialFormData="formData"
          :loading="status === 'pending'"
          @submit="handleFormSubmit"
        />
        <p class="flex justify-end text-sm mt-2">
          Vous avez déjà un compte ?
          <RouterLink :to="{ name: 'login' }">
            <p
              class="block ml-3 text-blue-700 hover:underline-offset-8 transition ease-in-out delay-75"
            >
              Se connecter
            </p>
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import { useAuthStore } from "../../stores";
import RegisterForm from "../../forms/modules/auth/RegisterForm.vue";
import { IRegisterFormData } from "../../forms/modules/auth/RegisterForm.vue";

const router = useRouter();
const authStore = useAuthStore();
const { error, status } = toRefs(authStore);

const $toast = useToast();

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isTermsOfSale: false,
});

const handleFormSubmit = async (data: IRegisterFormData) => {
  const { confirmPassword, ...userData } = data;
  await authStore.register(userData);
  if (authStore.status === "success") {
    $toast.success("Votre compte a été crée avec succès!", {
      position: "top-right",
      duration: 3000,
    });
    router.push({ name: "registerConfirmation" });
  }
};

onUnmounted(() => {
  authStore.resetStatus();
});
</script>
