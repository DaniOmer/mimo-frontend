<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-1">Vos données personnelles</h1>
    <p class="text-sm">
      Voir et mettre à jour vos informations ici. Gérez vos identifiants et mots
      de passe ici.
    </p>
    <div>
      <div>
        <div class="flex justify-between items-center border-b border-gray-300">
          <div class="flex lg:gap-6 xl:gap-20 py-14">
            <div><UserIcon class="size-8 text-black" /></div>
            <div>
              <p class="font-semibold">Nom</p>
              <p>{{ user?.firstName }} {{ user?.lastName }}</p>
            </div>
            <div>
              <p class="font-semibold">Téléphone mobile</p>
              <p>{{ user?.email }}</p>
            </div>
          </div>
          <BaseButton
            classes="text-primary border-primary hover:bg-primary hover:text-white w-40 h-fit"
            label="Modifier"
            type="button"
            @click="open"
          />
        </div>
        <BaseModal :isOpen="isOpen" :close="close">
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
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/outline";
import { toRefs, computed } from "vue";

import { useUserStore } from "../../stores";
import { useModal } from "../../composables/useModal";
import BaseModal from "../../components/BaseModal.vue";
import BaseButton from "../../components/form/BaseButton.vue";
import PersonalInfosForm from "../../forms/modules/user/PersonalInfosForm.vue";
import { IPersonalInfosFormData } from "../../forms/modules/user/PersonalInfosForm.vue";
import { IUser } from "../../api";

const userStore = useUserStore();
const { user, error, status } = toRefs(userStore);

const firstName = computed(() => userStore.user?.firstName || "");
const lastName = computed(() => userStore.user?.lastName || "");

const { isOpen, open, close } = useModal();

const handleFormSubmit = async (data: IPersonalInfosFormData) => {
  try {
    const updates = {
      ...user.value,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    await userStore.updateProfile(updates as IUser);

    if (status.value === "success") {
      close();
    } else {
      console.error("Mise à jour échouée:", error.value);
    }
  } catch (err) {
    console.error("Erreur lors de la soumission:", err);
    error.value = err;
  }
};
</script>
