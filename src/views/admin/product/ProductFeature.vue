<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">
      Administration des caractéristiques produits
    </h1>

    <p class="mt-4 mb-4 text-sm">
        Vous pouvez gérer les caractéristiques des produits.
    </p>

    <div
      v-if="productFeatureStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        productFeatureStore.error ||
        "Une erreur est survenue lors de la récupération des caractéristiques produits."
      }}
    </div>

    <div
      v-if="productFeatureStore.status === 'pending'"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredProductFeatures"
      :enableSort="true"
      :enablePagination="true"
      :enableActions="true"
      exportFileName="Export_caracteristiques_produits.csv"
    >
      <template #table-title>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">
            Liste des caractéristiques produits
          </h2>
        </div>
      </template>

      <template #table-controls>
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <SearchBar
            v-model="searchQuery"
            placeholder="Rechercher par nom ou description"
            @search="handleSearch"
          />

          <div class="flex gap-4">
            <BaseButton
              color="primary"
              @click="openAddModal"
              label="Ajouter une caractéristique"
            />
          </div>
        </div>
      </template>

      <template #description="{ item }">
        <span>{{ item.description || "-" }}</span>
      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="
              editProductFeature(item);
              closeActionMenu();
            "
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editer
          </button>
          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="
              confirmDeleteProductFeature(item);
              closeActionMenu();
            "
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Supprimer
          </button>
        </div>
      </template>

      <template #createdAt="{ item }">
        <span>{{ formatDateTime(item.createdAt) }}</span>
      </template>

      <template #updatedAt="{ item }">
        <span>{{ formatDateTime(item.updatedAt) }}</span>
      </template>
    </Table>

    <ProductFeatureFormModal
      :visible="isModalVisible"
      :initialData="selectedProductFeature"
      :loading="isFormLoading"
      @submit="handleFormSubmit"
      @close="closeModal"
    />

    <ConfirmationDialog
      :visible="isDeleteDialogVisible"
      @close="isDeleteDialogVisible = false"
      @confirm="deleteProductFeature"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la caractéristique produit ${productFeatureToDelete?.name} ? Cette action est irréversible.`"
      confirmText="Supprimer"
      cancelText="Annuler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BaseButton from "../../../components/form/BaseButton.vue";
import Loader from "../../../components/BaseLoader.vue";
import SearchBar from "../../../components/SearchBar.vue";
import { useProductFeatureStore } from "../../../stores/modules/productFeature.store";
import Table from "../../../components/Table.vue";
import ConfirmationDialog from "../../../components/ConfirmationDialog.vue";
import ProductFeatureFormModal from "../../../forms/modules/admin/product/ProductFeatureFormModal.vue";
import { IProductFeature } from "../../../api/";
import { formatDateTime } from "../../../utils/";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const productFeatureStore = useProductFeatureStore();

const isDeleteDialogVisible = ref(false);
const productFeatureToDelete = ref<IProductFeature | null>(null);
const isModalVisible = ref(false);
const selectedProductFeature = ref<IProductFeature | null>(null);
const isFormLoading = ref(false);

const searchQuery = ref("");

const columns = [
  { key: "name", label: "Nom", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "createdAt", label: "Date Création", sortable: true },
  { key: "updatedAt", label: "Date Mise à Jour", sortable: true },
];

onMounted(async () => {
  await productFeatureStore.fetchProductFeatures();
});

const productFeatures = computed(() => productFeatureStore.productFeatures);

const filteredProductFeatures = computed(() => {
  if (!searchQuery.value) return productFeatures.value;
  const query = searchQuery.value.toLowerCase();
  return productFeatures.value.filter(
    (feature: IProductFeature) =>
      feature.name.toLowerCase().includes(query) ||
      (feature.description && feature.description.toLowerCase().includes(query))
  );
});

function openAddModal() {
  selectedProductFeature.value = null;
  isModalVisible.value = true;
}

function editProductFeature(feature: IProductFeature) {
  selectedProductFeature.value = feature;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedProductFeature.value = null;
}

function confirmDeleteProductFeature(feature: IProductFeature) {
  productFeatureToDelete.value = feature;
  isDeleteDialogVisible.value = true;
}

async function deleteProductFeature() {
  if (productFeatureToDelete.value) {
    isFormLoading.value = true;
    try {
      await productFeatureStore.deleteProductFeature(
        productFeatureToDelete.value._id
      );
      toast.success("Caractéristique produit supprimée avec succès!");
    } catch (error) {
      toast.error(
        "Erreur lors de la suppression de la caractéristique produit."
      );
      console.error(
        "Erreur lors de la suppression de la caractéristique produit :",
        error
      );
    } finally {
      isFormLoading.value = false;
      isDeleteDialogVisible.value = false;
      productFeatureToDelete.value = null;
    }
  }
}

async function handleFormSubmit(formData: Partial<IProductFeature>) {
  isFormLoading.value = true;
  try {
    if (selectedProductFeature.value) {
      await productFeatureStore.updateProductFeature(
        selectedProductFeature.value._id,
        formData
      );
      toast.success("Caractéristique produit mise à jour avec succès!");
    } else {
      await productFeatureStore.createProductFeature(formData);
      toast.success("Caractéristique produit créée avec succès!");
    }
  } catch (error) {
    toast.error("Erreur lors de la soumission du formulaire.");
    console.error("Erreur lors de la soumission du formulaire :", error);
  } finally {
    isFormLoading.value = false;
    closeModal();
  }
}

function handleSearch(query: string) {
  searchQuery.value = query;
}
</script>

