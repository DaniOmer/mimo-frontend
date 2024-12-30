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
        <RegisterForm
          :initialFormData="formData"
          :loading="loading"
          @submit="handleFormSubmit"
        />
        <p v-if="error" class="text-red-600">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

import RegisterForm from "../../forms/modules/auth/RegisterForm.vue";
import { IRegisterFormData } from "../../forms/modules/auth/RegisterForm.vue";
import { useAuthStore } from "../../stores";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { error, loading, user } = toRefs(authStore);

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
  if (user.value) {
    router.push({ name: "homepage" });
  }
};
</script>
