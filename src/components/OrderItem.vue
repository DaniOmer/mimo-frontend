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
        <p class="mt-1">{{ orderItem.product.description }}</p>
        <div class="mt-3 space-y-2">
          <div class="flex items-center gap-2">
            <p class="font-medium">Taille :</p>
            <p>{{ orderItem.productVariant.size || 'N/A' }}</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="font-medium">Couleur :</p>
            <div
              class="w-4 h-4 rounded-md border"
              :style="{ backgroundColor: orderItem.productVariant.color || '#000000' }"
            ></div>
          </div>
          <div class="flex items-center gap-2">
            <p class="font-medium">Quantité :</p>
            <p>{{ orderItem.quantity }}</p>
          </div>
          <div class="flex items-center gap-2">
            <p class="font-medium">Prix Unitaire :</p>
            <p>{{ orderItem.productVariant.priceEtx.toFixed(2) }} €</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-3">
    <BaseButton
      color="primary"
      @click="redirectToPage"
      label="Afficher votre article"
      class="w-auto px-4"
    />
  </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { IOrderItem } from "../api/order/order.types";
import BaseButton from "../components/form/BaseButton.vue";  

defineProps({
  orderItem: { type: Object as () => IOrderItem, required: true },
});

const router = useRouter();

const redirectToPage = () => {
  const url = "/page-url"; 
  router.push(url);
};
</script>
