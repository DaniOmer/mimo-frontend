<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-1">Adresses</h1>
    <p class="text-sm">Ajoutez ou modifiez vos adresses ici.</p>
    <div class="w-full grid grid-cols-3 gap-3 mt-10">
      <button
        class="border font-bold h-96 flex flex-col justify-center items-center gap-y-3 hover:text-quaternary"
        @click="open"
      >
        <PlusCircleIcon class="h-6 w-6" />
        <span>Ajouter une adresse</span>
      </button>
      <AddressModal
        :initialFormData="initalData"
        :isOpen="isOpen"
        :close="close"
        :handle-form-submit="handleAddressFormSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useModal } from "../../composables/useModal";
import AddressModal from "../../components/AddressModal.vue";
import { IAddress } from "../../api";

const initalData = ref({
  firstName: "",
  lastName: "",
  streetNumber: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  isBilling: false,
  isShipping: false,
  isDefault: false,
});

const { isOpen, open, close } = useModal();

const handleAddressFormSubmit = (data: IAddress) => {
  console.log("Address form submitted:", data);
};
</script>
