<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-1">Vos données personnelles</h1>
    <p class="text-sm">
      Voir et mettre à jour vos informations ici. Gérez vos identifiants et mots
      de passe ici.
    </p>
    <div>
      <div class="flex justify-between items-center border-b border-gray-300">
        <div class="flex lg:gap-6 xl:gap-20 py-14">
          <div><UserIcon class="size-8 text-black" /></div>
          <div>
            <p class="font-semibold">Nom</p>
            <p>{{ user?.firstName }} {{ user?.lastName }}</p>
          </div>
          <div>
            <p class="font-semibold">Mail</p>
            <p>{{ user?.email }}</p>
          </div>
        </div>
        <BaseButton
          classes="text-primary border-primary hover:bg-primary hover:text-white w-40 h-fit"
          label="Modifier"
          type="button"
          @click="openPersonalInfoModal"
        />
      </div>
      <BaseModal
        :isOpen="isPersonalInfoModalOpen"
        :close="closePersonalInfoModal"
      >
        <template v-slot:header>
          <h2 class="text-lg font-semibold">
            Mettre à jour mes données personnelles
          </h2>
        </template>
        <template v-slot:body>
          <PersonalInfosForm
            :initialFormData="{
              firstName: firstName,
              lastName: lastName,
            }"
            :loading="userStore.isLoading"
            :submit-error="error"
            @submit="handleFormSubmit"
          />
        </template>
      </BaseModal>
    </div>
    <div class="flex justify-between items-center border-b border-gray-300">
      <div class="flex lg:gap-6 xl:gap-20 py-14">
        <div><LockClosedIcon class="size-8 text-black" /></div>
        <div>
          <p class="font-semibold">Votre mot de passe</p>
          <p>************</p>
        </div>
      </div>
      <BaseButton
        classes="text-primary border-primary hover:bg-primary hover:text-white w-40"
        label="Modifier"
        type="button"
        @click="openPasswordModal"
      />
      <BaseModal :isOpen="isPasswordModalOpen" :close="closePasswordModal">
        <template v-slot:header>
          <h2 class="text-lg font-semibold">Changer le mot de passe</h2>
        </template>
        <template v-slot:body>
          <ChangePasswordForm
            :initialFormData="changePasswordFormData"
            :loading="userStore.isLoading"
            :submit-error="error"
            @submit="handlePasswordFormSubmit"
          />
        </template>
      </BaseModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/outline";
import { toRefs, computed, ref } from "vue";
import { useToast } from "vue-toast-notification";

import { useUserStore } from "../../stores";
import { useModal } from "../../composables/useModal";
import BaseModal from "../../components/BaseModal.vue";
import BaseButton from "../../components/form/BaseButton.vue";
import PersonalInfosForm from "../../forms/modules/user/PersonalInfosForm.vue";
import { IPersonalInfosFormData } from "../../forms/modules/user/PersonalInfosForm.vue";
import ChangePasswordForm from "../../forms/modules/user/ChangePasswordForm.vue";
import { IPasswordChange } from "../../api";
import { IUser } from "../../api";

const userStore = useUserStore();
const $toast = useToast();
const { user, error, status } = toRefs(userStore);

const firstName = computed(() => userStore.user?.firstName || "");
const lastName = computed(() => userStore.user?.lastName || "");

const changePasswordFormData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const {
  isOpen: isPersonalInfoModalOpen,
  open: openPersonalInfoModal,
  close: closePersonalInfoModal,
} = useModal();

const {
  isOpen: isPasswordModalOpen,
  open: openPasswordModal,
  close: closePasswordModal,
} = useModal();

const handleFormSubmit = async (data: IPersonalInfosFormData) => {
  try {
    const updates = {
      ...user.value,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    await userStore.updateProfile(updates as IUser);

    if (status.value === "success") {
      closePersonalInfoModal();
      $toast.success("Vos informations ont été mis à jours avec succès.", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      console.error("Mise à jour échouée:", error.value);
    }
  } catch (err) {
    console.error("Erreur lors de la soumission:", err);
    error.value = err;
  }
};

const handlePasswordFormSubmit = async (data: IPasswordChange) => {
  try {
    await userStore.changePassword(data);

    if (status.value === "success") {
      closePasswordModal();
      $toast.success("Vos mot de passe a été mis à jour avec succès.", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      console.error("Changement de mot de passe échoué:", error.value);
    }
  } catch (err) {
    console.error("Erreur lors de la soumission:", err);
    error.value = err;
  }
};
</script>
