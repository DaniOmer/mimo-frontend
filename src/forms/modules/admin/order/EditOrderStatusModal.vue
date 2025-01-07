<template>
    <BaseModal :isOpen="visible" :close="onClose">
      <template #header>
        <h2 class="text-lg font-semibold">Modifier le Statut de la Commande</h2>
      </template>
  
      <template #body>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Numéro de la Commande (lecture seule) -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Numéro de la Commande</label>
            <input
              type="text"
              :value="orderData.number"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              disabled
            />
          </div>
  
          <!-- Statut de la Commande -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Statut</label>
            <FilterSelect
              v-model="localOrderData.status"
              :options="statusOptions"
              placeholder="Sélectionner un statut"
              :isMultiple="false"
            />
            <p v-if="errors.status" class="mt-1 text-sm text-red-600">
              {{ errors.status }}
            </p>
          </div>
  
          <!-- Bouton de Soumission -->
          <BaseButton :label="submitLabel" type="submit" :loading="loading" />
        </form>
      </template>
    </BaseModal>
  </template>
  
  <script setup lang="ts">
  import { reactive, watch, computed } from "vue";
  import { defineProps, defineEmits } from "vue";
  import { useFormValidation } from "../../../../composables/useFormValidation";
  import BaseButton from "../../../../components/form/BaseButton.vue";
  import BaseModal from "../../../../components/BaseModal.vue";
  import FilterSelect from "../../../../components/FilterSelect.vue";
  import { editOrderStatusSchema } from "../../../schema/editOrderStatusSchema";
  import { OrderStatus, IOrder } from "../../../../api";
  
  interface StatusOption {
    label: string;
    value: OrderStatus;
  }
  
  const props = defineProps<{
    visible: boolean;
    orderData: IOrder;
    statusOptions: StatusOption[];
    submitLabel?: string;
    loading?: boolean;
  }>();
  
  const emit = defineEmits<{
    (e: "submit", data: { status: OrderStatus }): void;
    (e: "close"): void;
  }>();
  
  const localOrderData = reactive({
    status: props.orderData.status,
  });
  
  const { errors, validate } = useFormValidation(editOrderStatusSchema);
  
  function handleSubmit() {
    if (!validate(localOrderData)) {
      return;
    }
    emit("submit", { status: localOrderData.status });
  }
  
  function onClose() {
    emit("close");
    resetLocalOrderData();
  }
  
  const submitLabel = computed(() => props.submitLabel || "Mettre à jour");
  
  watch(
    () => props.orderData,
    (newOrderData) => {
      localOrderData.status = newOrderData.status;
    },
    { immediate: true }
  );
  
  function resetLocalOrderData() {
    localOrderData.status = props.orderData.status;
  }
  </script>
  
  <style scoped>
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  </style>
  