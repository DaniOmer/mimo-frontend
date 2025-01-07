<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des Commandes</h1>

    <p class="mt-4 mb-4 text-sm">
      Vous pouvez gérer les commandes de l'application ici. Vous pouvez
      rechercher, filtrer, modifier le statut des commandes, etc.
    </p>

    <div
      v-if="orderStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        orderStore.error.message ||
        "Une erreur est survenue lors de la récupération des commandes."
      }}
    </div>

    <div
      v-if="orderStore.isLoading"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredOrders"
      :enableSort="true"
      :enablePagination="true"
      :pageSize="10"
      :enableMultiSelect="false"
      :enableActions="true"
      @row-click="openEditStatusModal"
    >
      <template #table-controls>
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div
            class="flex flex-wrap gap-4 items-center justify-between w-full lg:w-auto"
          >
            <SearchBar
              v-model="searchQuery"
              placeholder="Rechercher par numéro ou email"
              :searchMode="'front'"
              @search="handleSearch"
            />
            <div class="flex gap-4">
              <FilterSelect
                v-model="selectedStatus"
                :options="statusOptions"
                placeholder="Filtrer par Statut"
                @update:model-value="handleStatusChange"
              />
            </div>
          </div>
        </div>
      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-quaternary hover:text-secondary"
            @click.stop="
              viewOrderDetails(item);
              closeActionMenu();
            "
          >
            <EyeIcon class="w-4 h-4 mr-1" /> Voir les Détails
          </button>

          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="
              openEditStatusModal(item);
              closeActionMenu();
            "
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Modifier Statut
          </button>
        </div>
      </template>

      <template #status="{ item }">
        <span
          :class="[
            'px-4 py-1 rounded text-white text-xs',
            statusClass(item.status),
          ]"
        >
          {{ capitalizeStatus(item.status) }}
        </span>
      </template>

      <template #orderNumber="{ item }">
        <span>{{ item.number }}</span>
      </template>

      <template #userName="{ item }">
        <span>{{`${item?.user?.lastName} ${item?.user?.firstName}` }}</span>
      </template>
    </Table>

    <EditOrderStatusModal
      v-if="orderToEdit"
      :visible="isEditStatusModalVisible"
      :orderData="orderDataForEdit"
      :statusOptions="statusOptions"
      @submit="handleUpdateOrderStatus"
      @close="closeEditStatusModal"
      submitLabel="Mettre à jour"
      :loading="isLoadingUpdate"
    />

    <OrderDetailsModal
      v-if="orderStore.selectedOrderDetails"
      :visible="isOrderDetailsModalVisible"
      :order="orderStore.selectedOrderDetails"
      @close="closeOrderDetailsModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SearchBar from "../../../components/SearchBar.vue";
import FilterSelect from "../../../components/FilterSelect.vue";
import Table from "../../../components/Table.vue";
import EditOrderStatusModal from "../../../forms/modules/admin/order/EditOrderStatusModal.vue";
import OrderDetailsModal from "../../../forms/modules/admin/order//OrderDetailsModal.vue";
import Loader from "../../../components/BaseLoader.vue";
import { useOrderStore } from "../../../stores/modules/order.store";

import { EyeIcon, PencilSquareIcon } from "@heroicons/vue/24/solid";

import { IOrder, OrderStatus } from "../../../api/";
import { useToast } from "vue-toast-notification";
import { formatDateTime } from "../../../utils/date.ts";

interface Option {
  label: string;
  value: string | OrderStatus;
}

const orderStore = useOrderStore();
const $toast = useToast();

const searchQuery = ref("");
const selectedStatus = ref<string | null>(null);

const statusOptions = ref<Option[]>([
  { label: "Pending", value: OrderStatus.Pending },
  { label: "Completed", value: OrderStatus.Completed },
  { label: "Shipped", value: OrderStatus.Shipped },
  { label: "Delivered", value: OrderStatus.Delivered },
  { label: "Canceled", value: OrderStatus.Canceled },
]);

const columns = [
  { key: "orderNumber", label: "Numéro de Commande", sortable: true },
  { key: "userName", label: "Nom du client", sortable: true },
  {
    key: "status",
    label: "Statut",
    align: "center" as "center",
  },
  {
    key: "amountEtx",
    label: "Montant HT",
    sortable: true,
    align: "center" as "center",
    format: (value: number) => value.toFixed(2) + " €",
  },
  {
    key: "amountVat",
    label: "Montant TTC",
    sortable: true,
    align: "center" as "center",
    format: (value: number) => value.toFixed(2) + " €",
  },
  {
    key: "createdAt",
    label: "Date Création",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false),
    align: "center" as "center",
  },
];

const isEditStatusModalVisible = ref(false);
const orderToEdit = ref<IOrder | null>(null);
const isLoadingUpdate = ref(false);

const isOrderDetailsModalVisible = ref(false);

const orderDataForEdit = computed(() => {
  if (orderToEdit.value) {
    return orderToEdit.value;
  }
  return {
    _id: "",
    user: "",
    number: "",
    status: OrderStatus.Pending,
    amountEtx: 0,
    amountVat: 0,
    shippingAddress: "",
    billingAddress: "",
  } as IOrder;
});

onMounted(async () => {
  try {
    await orderStore.fetchAllOrders();
  } catch (error) {
    $toast.error("Erreur lors du chargement des commandes.", {
      position: "top",
      duration: 3000,
    });
  }
});

const filteredOrders = computed(() => {
  return orderStore.orders.filter((order: any) => {
    const matchesSearch =
      order.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !selectedStatus.value || order.status === selectedStatus.value;
    return matchesSearch && matchesStatus;
  });
});

function statusClass(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Pending:
      return "bg-yellow-500";
    case OrderStatus.Completed:
      return "bg-green-500";
    case OrderStatus.Shipped:
      return "bg-blue-500";
    case OrderStatus.Delivered:
      return "bg-indigo-500";
    case OrderStatus.Canceled:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

function capitalizeStatus(status: OrderStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function handleSearch(query: string) {
  searchQuery.value = query;
}

function handleStatusChange(
  selected: string | number | (string | number)[] | null
) {
  if (typeof selected === "string" || selected === null) {
    selectedStatus.value = selected;
  }
}

function openEditStatusModal(order: IOrder) {
  orderToEdit.value = order;
  isEditStatusModalVisible.value = true;
}

function closeEditStatusModal() {
  isEditStatusModalVisible.value = false;
  orderToEdit.value = null;
}

async function handleUpdateOrderStatus(updatedData: { status: OrderStatus }) {
  if (orderToEdit.value) {
    isLoadingUpdate.value = true;
    try {
      await orderStore.updateOrderStatus(orderToEdit.value._id, updatedData.status);
      $toast.success("Statut de la commande mis à jour avec succès!", {
        position: "top",
        duration: 3000,
      });
      closeEditStatusModal();
    } catch (error) {
      $toast.error("Erreur lors de la mise à jour du statut de la commande.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isLoadingUpdate.value = false;
    }
  }
}

async function viewOrderDetails(order: IOrder) {
  if (!order.number) return;
  try {
    await orderStore.fetchOrderByNumber(order.number);
    isOrderDetailsModalVisible.value = true;
  } catch (error) {
    $toast.error("Erreur lors de la récupération du détail de la commande.", {
      position: "top",
      duration: 3000,
    });
  }
}

function closeOrderDetailsModal() {
  isOrderDetailsModalVisible.value = false;
  orderStore.selectedOrderDetails = null;
}
</script>
