<!-- src/components/admin/order/OrderDetailsModal.vue -->
<template>
    <BaseModal :isOpen="visible" :close="onClose">
      <template #header>
        <h2 class="text-lg font-semibold text-primary">Détails de la Commande</h2>
      </template>
  
      <template #body>
        <div v-if="order">
          <!-- Numéro et Statut -->
          <div class="mb-4">
            <h3 class="font-semibold text-md text-primary">
              Commande #{{ order.number }}
            </h3>
            <p class="text-sm text-tertiary">
              Statut :
              <span
                :class="[
                  'px-2 py-1 text-white rounded',
                  statusClass(order.status),
                ]"
              >
                {{ order.status }}
              </span>
            </p>
          </div>
  
          <!-- Informations Commande -->
          <div class="mb-4">
            <p class="text-sm text-primary">
              Date de création : {{ formatDate(order.createdAt) }}
            </p>
            <p class="text-sm text-primary">
              Nom du client :
              <span class="text-quaternary font-semibold">
                {{ userName }}
              </span>
            </p>
            <p class="text-sm text-primary">
              Adresse de livraison :
              <span class="text-quaternary">
                {{ shippingAddress }}
              </span>
            </p>
          </div>
  
          <!-- Liste des Produits -->
          <div>
            <h4 class="font-semibold text-md text-primary mb-2">
              Articles de la commande
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in order.items"
                :key="index"
                class="flex items-center justify-between bg-tertiary bg-opacity-10 p-2 rounded"
              >
                <span class="text-sm font-medium text-primary">
                  <!-- Afficher le nom du produit -->
                  {{ getItemName(item) }}
                </span>
                <span class="text-sm text-quaternary font-semibold">
                  {{ item.priceEtx }} € x {{ item.quantity }}
                </span>
              </li>
            </ul>
          </div>
  
          <!-- Montant Total de la commande (HT et éventuellement TTC) -->
          <div class="mt-6 text-right">
            <p class="text-md text-primary font-semibold">
              Montant HT : {{ order.amountEtx }} €
            </p>

            <p class="text-md text-primary font-semibold">
              Montant TTC : {{ order.amountVat }} €
            </p>
          </div>
        </div>
  
        <div v-else class="text-sm text-red-500">
          Aucune donnée de commande disponible.
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  import { defineProps, defineEmits } from "vue";
  import BaseModal from "../../../../components/BaseModal.vue";
  import { IOrder } from "../../../../api/";
  import { formatDateTime } from "../../../../utils/date";
  import { OrderStatus as OS } from "../../../../api/";
  
  const props = defineProps<{
    visible: boolean;
    order: IOrder | null;
  }>();
  
  const emit = defineEmits<{
    (e: "close"): void;
  }>();
  
  function onClose() {
    emit("close");
  }
  
  function formatDate(dateString: string | Date): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return formatDateTime(date, false);
  }
  
  function statusClass(status: OS) {
    switch (status) {
      case OS.Pending:
        return "bg-yellow-500";
      case OS.Completed:
        return "bg-green-500";
      case OS.Shipped:
        return "bg-blue-500";
      case OS.Delivered:
        return "bg-indigo-500";
      case OS.Canceled:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }
  
  const userName = computed(() => {
    if (!props.order?.user || typeof props.order.user === "string") {
      return "N/A";
    }
    return `${props.order.user.firstName || ""} ${
      props.order.user.lastName || ""
    }`.trim();
  });
  
  const shippingAddress = computed(() => {
    if (
      !props.order?.shippingAddress ||
      typeof props.order.shippingAddress === "string"
    ) {
      return "N/A";
    }
    const address = props.order.shippingAddress;
    return `${address.street || ""}, ${address.city || ""}, ${
      address.country || ""
    }`;
  });
  
  function getItemName(item: any): string {
    if (item.product) {
      return item.product.name || "Produit sans nom";
    }
    return "N/A";
  }
  </script>
  