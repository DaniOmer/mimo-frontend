<template>
    <div class="mt-10">
      <div class="min-w-[300px] md:w-1/2 lg:w-1/3 mx-auto">
        <div class="mb-6">
          <h1 class="text-base mx-auto w-fit">Complétez votre inscription</h1>
          <p class="mx-auto w-fit text-sm text-primary">
            Définissez votre mot de passe pour finaliser votre inscription.
          </p>
        </div>
        <div>
          <p v-if="error" class="text-red-600">{{ error }}</p>
          <InvitationForm
            :initialFormData="formData"
            :loading="status === 'pending'"
            @submit="handleFormSubmit"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, toRefs } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  import { useToast } from "vue-toast-notification";
  import "vue-toast-notification/dist/theme-sugar.css";
  
  import { useAuthStore } from "../../stores";
  import InvitationForm from "../../forms/modules/auth/InvitationForm.vue";
  import { IInvitationFormData } from "../../forms/modules/auth/InvitationForm.vue";
  
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const { error, status } = toRefs(authStore);
  
  const $toast = useToast();
  
  const formData = ref<IInvitationFormData>({
    tokenHash: route.query.tokenHash as string || "",
    password: "",
    confirmPassword: "",
    isTermsOfSale: false,
  });
  
  const handleFormSubmit = async (data: IInvitationFormData) => {
    const { confirmPassword, ...userData } = data;
  
    if (!userData.tokenHash) {
      $toast.error("Token invalide ou manquant.", {
        position: "top",
        duration: 3000,
      });
      return;
    }
  
    await authStore.createUserFromInvitation(userData);
  
    if (authStore.status === "success") {
      $toast.success("Votre compte a été activé avec succès!", {
        position: "top",
        duration: 3000,
      });
      router.push({ name: "login" });
    }
  };
  
  onMounted(() => {
    if (!formData.value.tokenHash) {
      $toast.error("Lien d'invitation invalide.", { position: "top", duration: 3000 });
      router.push({ name: "login" });
    }
  });
  </script>
  