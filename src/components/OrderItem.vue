<template>
  <div class="p-4 w-full mb-4 border rounded-md shadow-sm bg-white">
    <h3 class="font-semibold text-lg">{{ orderItem.product.name }}</h3>
    <div class="flex gap-4 items-start">
      <div class="w-32 h-32 flex-shrink-0">
        <img
          :src="orderItem.product.image?.url || 'https://via.placeholder.com/150'"
          alt="Produit"
          class="w-full h-full mt-2 object-cover rounded"
        />
      </div>
      <div class="flex-1 text-sm">
        <p class="text-gray-500 mt-1">{{ orderItem.description }}</p>
        <div class="mt-3 space-y-2">
          <div class="flex items-center gap-2">
            <strong>Taille :</strong>
            <span>{{ orderItem.productVariant.size || 'N/A' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <strong>Couleur :</strong>
            <div
              class="w-4 h-4 rounded-md border"
              :style="{ backgroundColor: orderItem.productVariant.color || '#000000' }"
            ></div>
          </div>
          <div class="flex items-center gap-2">
            <strong>Quantité :</strong>
            <span>{{ orderItem.quantity }}</span>
          </div>
          <div class="flex items-center gap-2">
            <strong>Prix Unitaire :</strong>
            <span>{{ orderItem.productVariant.priceEtx.toFixed(2) }} €</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-3">
      <button
        class="px-4 py-2 text-sm text-white border border-quaternary rounded bg-quaternary hover:bg-quaternary transition"
      >
        Afficher votre article
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IOrderItem } from "../api/order/order.types";

defineProps({
  orderItem: { type: Object as () => IOrderItem, required: true },
});
</script>
