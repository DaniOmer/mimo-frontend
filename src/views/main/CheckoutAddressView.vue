<template>
  <div class="w-full">
    <h1 class="text-2xl font-semibold mb-4">Sélectionnez vos adresses</h1>
    <p class="text-sm mb-8">
      Choisissez une adresse de livraison et une adresse de facturation. Vous
      pouvez utiliser la même adresse pour les deux.
    </p>

    <!-- Sélectionner l'adresse de livraison -->
    <form @submit="handleFormSubmit">
      <div class="mb-6">
        <label for="shippingAddress" class="block text-sm font-medium mb-2"
          >Adresse de livraison</label
        >
        <select
          id="shippingAddress"
          v-model="selectedShippingAddress"
          class="w-full border border-gray-300 rounded p-2"
        >
          <option value="" disabled>
            Sélectionner une adresse de livraison
          </option>
          <option
            v-for="(address, index) in addresses"
            :key="index"
            :value="address"
          >
            {{ address.firstName }} {{ address.lastName }} -
            {{ address.streetNumber }} {{ address.street }}, {{ address.city }}
          </option>
        </select>
      </div>

      <!-- Sélectionner l'adresse de facturation -->
      <div class="mb-6">
        <label for="billingAddress" class="block text-sm font-medium mb-2"
          >Adresse de facturation</label
        >
        <select
          id="billingAddress"
          v-model="selectedBillingAddress"
          class="w-full border border-gray-300 rounded p-2"
        >
          <option value="" disabled>
            Sélectionner une adresse de facturation
          </option>
          <option
            v-for="(address, index) in addresses"
            :key="index"
            :value="address"
          >
            {{ address.firstName }} {{ address.lastName }} -
            {{ address.streetNumber }} {{ address.street }}, {{ address.city }}
          </option>
        </select>
      </div>

      <!-- Option pour ajouter une nouvelle adresse -->
      <div class="mb-6">
        <button
          @click="openAddAddress"
          class="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Ajouter une nouvelle adresse
        </button>
      </div>

      <!-- Afficher le lien vers la page de paiement si les deux adresses sont sélectionnées -->
      <div
        v-if="selectedShippingAddress && selectedBillingAddress"
        class="mt-8"
      >
        <p class="text-sm text-green-600">
          Les deux adresses sont sélectionnées.
        </p>
        <!-- <RouterLink
          :to="{ name: 'paymentMethod' }"
          class="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Continuer vers le paiement -->
        <button
          class="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Continuer vers le paiement
        </button>
      </div>
    </form>

    <!-- Modal pour ajouter une adresse -->
    <AddressModal
      :initialFormData="formData"
      :isOpen="isAddModalOpen"
      :close="closeAddAddress"
      :handleFormSubmit="handleAddAddress"
      :loading="addressStore.isAddAddressLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { useToast } from "vue-toast-notification";

import AddressModal from "../../components/AddressModal.vue";
import { useAddressStore } from "../../stores/modules/address.store";
import { useOrderStore } from "../../stores";
import { useCartStore } from "../../stores/modules/cart.store";
import { IAddress } from "../../api";
import { useModal } from "../../composables/useModal";
import { useRouter } from "vue-router";

const addressStore = useAddressStore();
const orderStore = useOrderStore();
const cartStore = useCartStore();
const {
  addresses,
  getAddressesState,
  selectedShippingAddress,
  selectedBillingAddress,
} = toRefs(addressStore);

const {
  isOpen: isAddModalOpen,
  open: openAddAddress,
  close: closeAddAddress,
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

// Ajouter une nouvelle adresse
const handleAddAddress = async (data: Omit<IAddress, "_id" | "user">) => {
  await addressStore.addAddress(data);
  handleResponse(addressStore.addAddressState, closeAddAddress);
};
const router = useRouter();
const $toast = useToast();
// Gérer les réponses des actions
const handleResponse = (state: any, closeModal?: () => void) => {
  if (state.status === "success") {
    if (closeModal) closeModal();
    $toast.success("Adresse ajoutée avec succès", {
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

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  console.log("REQUEST STARTED");
  if (!selectedShippingAddress || !selectedBillingAddress) {
    $toast.error(
      "Veuillez sélectionner une adresse de livraison et de facturation",
      {
        position: "top-right",
        duration: 4000,
      }
    );
  }
  orderStore.createOrder({
    shippingAddressId: selectedShippingAddress.value?._id as string,
    billingAddressId: selectedBillingAddress.value?._id as string,
    cartId: cartStore.cart?._id as string,
  });
  router.push({ name: "paymentMethod" });
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
