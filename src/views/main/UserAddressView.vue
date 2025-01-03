<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-1">Adresses</h1>
    <p class="text-sm">Ajoutez ou modifiez vos adresses ici.</p>
    <div class="w-full grid grid-cols-3 gap-3 mt-10">
      <button
        class="border font-bold h-96 flex flex-col justify-center items-center gap-y-3 hover:text-quaternary"
        @click="openAddAddress"
      >
        <PlusCircleIcon class="h-6 w-6" />
        <span>Ajouter une adresse</span>
      </button>

      <!-- EXISTING ADDRESS CARD -->
      <AddressCard
        v-for="(address, index) in addresses"
        :key="index"
        :address="address"
        @click:update="prepareUpdateAddress"
        @click:delete="handleDeleteAddress"
      />

      <!-- MODAL FOR ADD ADDRESS -->
      <AddressModal
        :initialFormData="formData"
        :isOpen="isAddModalOpen"
        :close="closeAddAddress"
        :handleFormSubmit="handleAddAddress"
      />

      <!-- MODAL FOR UPDATE ADDRESS -->
      <AddressModal
        :initialFormData="formData"
        :isOpen="isUpdateModalOpen"
        :close="closeUpdateAddress"
        :handleFormSubmit="handleUpdateAddress"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useToast } from "vue-toast-notification";

import AddressModal from "../../components/AddressModal.vue";
import AddressCard from "../../components/AddressCard.vue";
import { useModal } from "../../composables/useModal";
import { useAddressStore } from "../../stores/modules/address.store";
import { IAddress } from "../../api";

const addressStore = useAddressStore();
const { addresses, getAddressesState } = toRefs(addressStore);

const {
  isOpen: isAddModalOpen,
  open: openAddAddress,
  close: closeAddAddress,
} = useModal();
const {
  isOpen: isUpdateModalOpen,
  open: openUpdateAddress,
  close: closeUpdateAddress,
} = useModal();

const formData = ref({
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

const $toast = useToast();

const prepareUpdateAddress = (address: IAddress) => {
  formData.value = { ...address, state: address.state || "" };
  openUpdateAddress();
};

const handleAddAddress = async (data: Omit<IAddress, "_id" | "user">) => {
  await addressStore.addAddress(data);
  handleResponse(addressStore.addAddressState, closeAddAddress);
};

const handleUpdateAddress = async (data: IAddress) => {
  console.log(data);
  await addressStore.updateAddress(data, data._id);
  handleResponse(addressStore.addAddressState, closeUpdateAddress);
};

const handleDeleteAddress = async (address: IAddress) => {
  console.log("WANT TO DELETE: " + address);
};

const handleResponse = (state: any, closeModal?: () => void) => {
  if (state.status === "success") {
    if (closeModal) closeModal();
    $toast.success("Action effectuée avec succès", {
      position: "top-right",
      duration: 4000,
    });
  } else if (state.error) {
    $toast.error(state.error.toString(), {
      position: "top-right",
      duration: 4000,
    });
  }
};

onMounted(async () => {
  await addressStore.getAddresses();
  if (getAddressesState.value.error) {
    $toast.error(getAddressesState.value.error.toString(), {
      position: "top-right",
      duration: 4000,
    });
  }
});
</script>
