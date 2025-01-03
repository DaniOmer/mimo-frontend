<template>
  <div class="border py-8 px-6 flex flex-col justify-between h-96">
    <h1 class="font-medium text-2xl mb-4 h-16">
      {{ address.firstName }} {{ address.lastName }}
    </h1>
    <div class="mb-6 text-base">
      <p>{{ address.streetNumber }} {{ address.street }}</p>
      <p>{{ address.postalCode }} {{ address.city }}</p>
      <p>{{ address.country }}</p>
    </div>
    <div>
      <div class="mb-4">
        <div v-if="address.isDefault" class="text-sm">
          <div v-if="address.isBilling" class="flex items-start opacity-50">
            <CheckIcon class="h-5 w-5 mr-3" />
            Adresse de facturation par défaut
          </div>
          <div v-else class="flex items-start opacity-50">
            <XMarkIcon class="h-5 w-5 mr-3" />
            Adresse de facturation par défaut
          </div>
          <div v-if="address.isShipping" class="flex items-start opacity-50">
            <CheckIcon class="h-5 w-5 mr-3" />
            Adresse de livraison par défaut
          </div>
          <div v-else class="flex items-start opacity-50">
            <XMarkIcon class="h-5 w-5 mr-3" />
            Adresse de livraison par défaut
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 w-full gap-x-2">
        <button class="w-full text-center font-medium">
          <TrashIcon class="h-12 w-12 border border-black p-2" />
        </button>
        <button
          class="text-center font-medium flex justify-center items-center gap-x-3 border border-black col-span-3"
        >
          <PencilSquareIcon class="h-12 w-12 p-2" />
          <span>Modifier</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";

import { IAddress } from "../api";

defineProps<{
  address: IAddress;
  // handleEditAddress: () => void;
  // handleDeleteAddress: () => void;
}>();
</script>
