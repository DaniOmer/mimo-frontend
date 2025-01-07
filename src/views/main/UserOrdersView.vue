<template>
  <div class="p-6 w-full">
    <h1 class="text-xl font-bold mb-6">Mes Commandes</h1>
    <div>
      <div
        v-for="order in orders"
        :key="order.number"
        class="border rounded-md bg-white shadow-sm mb-6"
      >
        <div class="flex items-center justify-between bg-quaternary px-6 py-4 text-sm text-white">
         
          <div>
            <p class="font-semibold">Commande effectuée le</p>
            <p>{{ order.createdAt ? new Date(order.createdAt).toLocaleDateString("fr-FR") : "Date non définie" }}</p>
          </div>

          <div>
            <p class="font-semibold">Total</p>
            <p>{{ (order.amountVat).toFixed(2) }} €</p>
          </div>

          <div>
            <p class="font-semibold">Livraison à</p>
            <a
              href="javascript:void(0)"
              class="text-blue-600 underline"
              @click="goToAddressPage"
            >
              {{ order.user.firstName }} {{ order.user.lastName }}
            </a>
          </div>

          <div>
            <p class="font-semibold">N° de commande</p>
            <p>{{ order.number }}</p>
          </div>

          <div class="flex space-x-3">
            <button 
              @click="openOrderDetailsModal(order)" 
              class="text-blue-600 hover:underline"
            >
              Détails de commande
            </button>
            <p :class="[getStatusDetails(order.status).color, 'ml-4border rounded-sm']">
                {{ getStatusDetails(order.status).label }}
            </p>
          </div>
        </div>

        <div class="px-6 py-4">
          <OrderCard
            v-for="item in order.items"
            :key="item.product"
            :orderItem="item"
            :imageUrl="item.product.image?.url || 'https://via.placeholder.com/150'"
            :handleOrderAction="handleOrderAction"
          />
        </div>
      </div>
    </div>

    <UserOrderModal
      :isOpen="isOrderDetailsModalOpen"
      :close="closeOrderDetailsModal"
      :orderData="selectedOrder"
      :handle-order-action="handleOrderAction"
    />
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from "../../stores/modules/order.store";
import { storeToRefs } from "pinia";
import OrderCard from "../../components/OrderItem.vue";
import UserOrderModal from "../../components/UserOrderModal.vue";
import { IOrder } from "../../api/order/order.types";
import { getStatusDetails } from "../../utils/status.utils";
import { onMounted, ref } from "vue";
import { router } from "../../router";

const ordersStore = useOrderStore();
const { orders } = storeToRefs(ordersStore);

const isOrderDetailsModalOpen = ref(false);
const selectedOrder = ref<IOrder | null>(null);

onMounted(() => {
  ordersStore.fetchOrders();
});

function goToAddressPage() {
  router.push({ name: "userAddress" });
}

function openOrderDetailsModal(order: IOrder) {
  selectedOrder.value = order; 
  isOrderDetailsModalOpen.value = true; 
}

function closeOrderDetailsModal() {
  isOrderDetailsModalOpen.value = false; 
  selectedOrder.value = null; 
}

function handleOrderAction(action: string, order: IOrder) {
  console.log(`Action ${action} sur la commande`, order);
}

</script>
