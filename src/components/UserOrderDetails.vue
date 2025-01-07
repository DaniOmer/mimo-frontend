<template>
  <div class="p-6 w-full">
    <div class="flex justify-between items-center text-sm text-gray-700 mb-6">
      <div>
        <p>Commandé le {{ formatDate(order.createdAt) }}</p>
        <p>N° de commande : {{ order.number }}</p>
      </div>
      <a href="#" class="text-blue-600 underline">Facture</a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="border rounded-md p-4 bg-gray-50">
        <h2 class="text-lg font-semibold mb-2">Adresse de livraison</h2>
        <p>{{ order.shippingAddress.streetNumber }} {{ order.shippingAddress.street }}</p>
        <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.postalCode }}</p>
        <p>{{ order.shippingAddress.country }}</p>
      </div>
      <div class="border rounded-md p-4 bg-gray-50">
        <h2 class="text-lg font-semibold mb-2">Récapitulatif de commande</h2>
        <div class="flex justify-between">
          <span>Total des articles :</span>
          <span>{{ (order.amountEtx).toFixed(2) }} €</span>
        </div>
        <div class="flex justify-between">
          <span>Montant HT :</span>
          <span>{{ (order.amountEtx).toFixed(2) }} €</span>
        </div>
        <div class="flex justify-between">
          <span>TVA (20%) :</span>
          <span>{{ calculateTvaAmount(order.amountEtx).toFixed(2) }} €</span>
        </div>
        <div class="flex justify-between font-semibold">
          <span>Montant total TTC :</span>
          <span>{{ order.amountVat.toFixed(2) }} €</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IOrder} from "../api/order/order.types";

defineProps<{
  order: IOrder; 
}>();

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("fr-FR", options);
};

const calculateTvaAmount = (amountEtx: number): number => {
  return amountEtx * 0.2;
};
</script>
