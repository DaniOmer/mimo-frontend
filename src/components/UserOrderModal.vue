<template>
  <BaseModal :isOpen="isOpen" :close="close">
    <template v-slot:header>
      <h2 class="text-lg font-semibold">Détails de la commande</h2>
    </template>
    <template v-slot:body>
      <OrderDetails :order="orderData" @action="handleOrderAction" />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { IOrder } from "../api/order/order.types";
import BaseModal from "../components/BaseModal.vue";
import OrderDetails from "./UserOrderDetails.vue";

defineProps<{
  orderData: IOrder | null; 
  isOpen: boolean; 
  close: () => void; 
  handleOrderAction: (action: string, order: IOrder) => void; 
}>();
</script>
