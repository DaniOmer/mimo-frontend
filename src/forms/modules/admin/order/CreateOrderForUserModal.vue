<!-- src/forms/modules/admin/orderAdmin/CreateOrderForUserModal.vue -->
<template>
  <BaseModal :isOpen="visible" :close="onClose">
    <template #header>
      <h2 class="text-lg font-semibold text-primary">
        Créer une commande pour {{ userFullName }}
      </h2>
    </template>

    <template #body>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-medium text-sm text-primary">Liste des Produits</h3>
          <button
            class="px-3 py-1.5 rounded bg-quaternary text-white font-medium text-sm hover:bg-secondary transition-colors"
            @click="addNewItem"
          >
            Ajouter un article
          </button>
        </div>

        <!-- Tableau des articles -->
        <div class="overflow-x-auto border border-tertiary rounded">
          <table class="min-w-full text-left text-sm text-primary">
            <thead class="bg-tertiary bg-opacity-20 text-xs uppercase">
              <tr>
                <th class="px-4 py-2">Produit</th>
                <th class="px-4 py-2">Prix TTC</th>
                <th class="px-4 py-2">Quantité</th>
                <th class="px-4 py-2">Total TTC</th>
                <th class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in form.items"
                :key="index"
                class="border-b last:border-0 hover:bg-tertiary hover:bg-opacity-10 transition-colors"
              >
                <!-- Sélection du produit via FilterSelect -->
                <td class="px-4 py-2 w-64">
                  <FilterSelect
                    v-model="item.productId"
                    :options="productOptions"
                    placeholder="Sélectionner un produit"
                    :isMultiple="false"
                  />
                  <p
                    v-if="errors[index]?.productId"
                    class="text-xs text-red-500 mt-1"
                  >
                    {{ errors[index].productId }}
                  </p>
                </td>

                <!-- Prix Unitaire TTC (lecture seule) -->
                <td class="px-4 py-2 w-28 text-tertiary font-medium">
                  {{ getUnitPriceTtc(item.productId).toFixed(2) }} €
                </td>

                <!-- Quantité -->
                <td class="px-4 py-2 w-20">
                  <input
                    type="number"
                    class="w-full border border-tertiary rounded px-2 py-1 focus:outline-secondary"
                    v-model.number="item.quantity"
                    placeholder="Qté"
                    min="1"
                  />
                  <p
                    v-if="errors[index]?.quantity"
                    class="text-xs text-red-500 mt-1"
                  >
                    {{ errors[index].quantity }}
                  </p>
                </td>

                <td class="px-4 py-2 w-24 text-quaternary font-semibold">
                  {{
                    (getUnitPriceTtc(item.productId) * item.quantity).toFixed(2)
                  }}
                  €
                </td>

                <td class="px-4 py-2 w-16">
                  <div class="flex gap-2 items-center">
                    <button
                      type="button"
                      class="text-red-600 hover:text-red-800"
                      title="Supprimer"
                      @click="removeItem(index)"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="form.items.length === 0">
                <td
                  colspan="5"
                  class="px-4 py-2 text-center text-tertiary italic"
                >
                  Aucun article ajouté
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bouton de validation -->
        <div class="flex justify-end gap-3">
          <BaseButton color="gray" label="Annuler" @click="onClose" />
          <BaseButton
            color="primary"
            :label="isLoading ? 'Création...' : 'Valider la commande'"
            :loading="isLoading"
            @click="handleSubmit"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { defineProps, defineEmits, onMounted } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";
import BaseModal from "../../../../components/BaseModal.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import FilterSelect from "../../../../components/FilterSelect.vue";
import { useProductStore } from "../../../../stores/modules/product.store";
import { useOrderStore } from "../../../../stores/modules/order.store";

// Pas besoin de priceEtx ni priceVat
interface IAdminOrderItemSimplified {
  productId: string;
  quantity: number;
}

interface FormData {
  items: IAdminOrderItemSimplified[];
}

interface ItemErrors {
  productId?: string;
  quantity?: string;
}

const props = defineProps<{
  visible: boolean;
  userId: string;
  userFullName: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "orderCreated"): void;
}>();

const productStore = useProductStore();
const orderStore = useOrderStore();

const form = reactive<FormData>({
  items: [],
});

const errors = ref<ItemErrors[]>([]);

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.getActiveProducts();
  }
});

const productOptions = computed(() =>
  productStore.products.map((p) => ({
    label: p.name,
    value: p._id,
  }))
);

function getUnitPriceTtc(productId: string): number {
  const product = productStore.products.find((p) => p._id === productId);
  return product?.priceVat ?? 0;
}

function onClose() {
  emit("close");
  resetForm();
}

function resetForm() {
  form.items = [];
  errors.value = [];
}

function addNewItem() {
  form.items.push({
    productId: "",
    quantity: 1,
  });
  errors.value.push({});
}

function removeItem(index: number) {
  form.items.splice(index, 1);
  errors.value.splice(index, 1);
}

function validateItems() {
  let valid = true;
  errors.value = form.items.map(() => ({}));

  form.items.forEach((item, idx) => {
    if (!item.productId) {
      errors.value[idx].productId = "Veuillez sélectionner un produit.";
      valid = false;
    }
    if (!item.quantity || item.quantity < 1) {
      errors.value[idx].quantity = "Quantité invalide.";
      valid = false;
    }
  });
  return valid;
}

const isLoading = computed(() => orderStore.status === "pending");

async function handleSubmit() {
  if (form.items.length === 0) return;
  if (!validateItems()) return;

  try {
    const payload = {
      items: form.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    };
    await orderStore.createOrderForUserAction(props.userId, payload);
    emit("orderCreated");
    onClose();
  } catch (error ) {
   throw new Error('Erreur lors de la création de la commande');
  }
}
</script>

<style scoped></style>
