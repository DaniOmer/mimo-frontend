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
            <p>{{ order.shipDate?.toLocaleDateString("fr-FR") || "Date non définie" }}</p>
          </div>

          <div>
            <p class="font-semibold">Total</p>
            <p>{{ (order.amountEtx + order.amountVat).toFixed(2) }} €</p>
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
            <a :href="`/order/details/${order.number}`" class="text-blue-600 hover:underline">
              Détails de commande
            </a>
            <a :href="`/order/invoice/${order.number}`" class="text-blue-600 hover:underline">
              Facture
            </a>
          </div>

        </div>

        <div class="px-6 py-4">
          <OrderCard
            v-for="item in order.items"
            :key="item.product"
            :orderItem="item"
            :imageUrl="item.product.image?.url || 'https://via.placeholder.com/150'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from "../../stores/modules/order.store";
import { storeToRefs } from "pinia";
import OrderCard from "../../components/OrderItem.vue";
import { onMounted } from "vue";
import { router } from "../../router";

const ordersStore = useOrdersStore();
const { orders} = storeToRefs(ordersStore);

onMounted(() => {
  ordersStore.fetchOrders();
});
function goToAddressPage() {
  router.push({ name: "userAddress" }); 
}
</script>
