<template>
  <BaseModal :isOpen="isOpen" :close="close">
    <template v-slot:header>
      <h2 class="text-lg font-semibold">Ajouter une adresse</h2>
    </template>
    <template v-slot:body>
      <AddressForm
        :initialFormData="initialFormData"
        @submit="handleFormSubmit"
      />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { IAddress } from "../api";
import BaseModal from "../components/BaseModal.vue";
import AddressForm from "../forms/modules/user/AddressForm.vue";
import { IAddressFormData } from "../forms/modules/user/AddressForm.vue";

defineProps<{
  initialFormData: IAddressFormData;
  isOpen: boolean;
  close: () => void;
  loading?: boolean;
  handleFormSubmit: (data: IAddress) => void;
}>();
</script>
