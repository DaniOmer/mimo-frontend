<template>
  <div class="px-4 border-black">
    <h1 class="font-semibold text-lg mb-4">{{ username }}</h1>
    <div>
      <p>{{ address.streetNumber }} {{ address.street }}</p>
      <p>{{ address.postalCode }} {{ address.city }}</p>
      <p>{{ address.country }}</p>
    </div>
    <div v-if="address.isBilling" class="flex">
      <CheckIcon class="h-7 w-7 mr-3" />
      Adresse de facturation
    </div>
    <div v-else class="flex">
      <XMarkIcon class="h-7 w-7 mr-3" />
      Adresse de facturation
    </div>
    <div v-if="address.isShipping" class="flex">
      <CheckIcon class="h-7 w-7 mr-3" />
      Adresse de livraison
    </div>
    <div v-else class="flex">
      <XMarkIcon class="h-7 w-7 mr-3" />
      Adresse de livraison
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { IAddress } from "../api";

defineProps<{
  username: string;
  address: IAddress;
}>();
</script>
