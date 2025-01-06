<template>
  <div class="p-6 w-full border rounded-md shadow-sm bg-white">
    <div class="flex justify-between items-center text-sm text-gray-700 mb-4">
      <div>
        <p>Commandé le {{ formatDate(order.createdAt) }}</p>
        <p>N° de commande : {{ order.number }}</p>
      </div>
      <a href="#" class="text-blue-600 underline">Facture</a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="border rounded-md p-4 bg-gray-50">
        <h3 class="text-lg font-semibold mb-2">Adresse de livraison</h3>
        <p>{{ order.shippingAddress.streetNumber }} {{ order.shippingAddress.street }}</p>
        <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.postalCode }}</p>
        <p>{{ order.shippingAddress.country }}</p>
      </div>

      <div class="border rounded-md p-4 bg-gray-50">
        <h3 class="text-lg font-semibold mb-2">Récapitulatif de commande</h3>
        <div class="flex justify-between text-sm">
          <p class="font-bold ">Total des articles :</p>
          <p>{{ order.amountEtx.toFixed(2) }} €</p>
        </div>

        <div class="flex justify-between text-sm">
          <p class="font-bold ">Montant HT :</p>
          <p>{{ order.amountEtx.toFixed(2) }} €</p>
        </div>

        <div class="flex justify-between text-sm">
          <p class="font-bold ">TVA (20%) :</p>
          <p>{{ calculateTvaAmount(order.amountEtx).toFixed(2) }} €</p>
        </div>

        <div class="flex justify-between text-sm font-semibold text-gray-900">
          <p class="font-bold">Montant total TTC :</p>
          <p>{{ order.amountVat.toFixed(2) }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IOrder } from "../api/order/order.types";

defineProps({
  order: { type: Object as () => IOrder, required: true },
});

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};

const calculateTvaAmount = (amountEtx: number): number => {
  return amountEtx * 0.2;
};
</script>
