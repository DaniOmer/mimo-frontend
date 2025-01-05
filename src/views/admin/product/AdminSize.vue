<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des tailles</h1>

    <p class="mt-4 mb-4 text-sm">
        Vous pouvez gérer les tailles disponibles pour les produits.
    </p>

    <div
      v-if="sizeStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        sizeStore.error ||
        "Une erreur est survenue lors de la récupération des tailles."
      }}
    </div>

    <div v-if="sizeStore.loading" class="flex justify-center items-center mb-4">
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredSizes"
      :enableSort="true"
      :enablePagination="true"
      :pageSize="10"
      :enableActions="true"
    >

      <template #table-controls>
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <SearchBar
            v-model="searchQuery"
            placeholder="Rechercher par nom ou dimensions"
            @search="handleSearch"
          />

          <div class="flex gap-4">
            <BaseButton
              color="primary"
              @click="openAddModal"
              label="Ajouter une taille"
            />
          </div>
        </div>
      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="
              editSize(item);
              closeActionMenu();
            "
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Edit
          </button>
          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="
              confirmDeleteSize(item);
              closeActionMenu();
            "
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Delete
          </button>
        </div>
      </template>
    </Table>

    <SizeFormModal
      :visible="isModalVisible"
      :initialData="selectedSize"
      :loading="isFormLoading"
      @submit="handleFormSubmit"
      @close="closeModal"
    />

    <ConfirmationDialog
      :visible="isDeleteDialogVisible"
      @close="isDeleteDialogVisible = false"
      @confirm="deleteSize"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la taille ${sizeToDelete?.name} ? Cette action est irréversible.`"
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
import { useSizeStore } from "../../../stores/modules/size.store";
import Table from "../../../components/Table.vue";
import ConfirmationDialog from "../../../components/ConfirmationDialog.vue";
import SizeFormModal from "../../../forms/modules/admin/product/SizeFormModal.vue";
import { ISize } from "../../../api/";
import { formatDateTime } from "../../../utils/";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const sizeStore = useSizeStore();

const isDeleteDialogVisible = ref(false);
const sizeToDelete = ref<ISize | null>(null);
const isModalVisible = ref(false);
const selectedSize = ref<ISize | null>(null);
const isFormLoading = ref(false);

const searchQuery = ref("");

const columns = [
  { key: "name", label: "Nom", sortable: true },
  { key: "dimensions", label: "Dimensions", sortable: true },
  { key: "volume", label: "Volume", sortable: true, align : "center" as "center"},
  { key: "weightCapacity", label: "Capacité de Poids", sortable: true, align : "center" as "center"},
  {
    key: "isPopular",
    label: "Populaire",
    sortable: true,
    format: (value: boolean) => (value ? "Oui" : "Non"),
    align : "center" as "center",
  },
  {
    key: "createdAt",
    label: "Date Création",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false),
  },
  {
    key: "updatedAt",
    label: "Date Mise à Jour",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false),
  },
];

onMounted(async () => {
  await sizeStore.fetchSizes();
});

const sizes = computed(() => sizeStore.sizes);

const filteredSizes = computed(() => {
  if (!searchQuery.value) return sizes.value;
  const query = searchQuery.value.toLowerCase();
  return sizes.value.filter(
    (size: ISize) =>
      size.name.toLowerCase().includes(query) ||
      size.dimensions.toLowerCase().includes(query)
  );
});

function openAddModal() {
  selectedSize.value = null;
  isModalVisible.value = true;
}

function editSize(size: ISize) {
  selectedSize.value = size;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedSize.value = null;
}

function confirmDeleteSize(size: ISize) {
  sizeToDelete.value = size;
  isDeleteDialogVisible.value = true;
}

async function deleteSize() {
  if (sizeToDelete.value) {
    isFormLoading.value = true;
    try {
      await sizeStore.deleteSize(sizeToDelete.value._id);
      toast.success("Taille supprimée avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la taille.");
      console.error("Erreur lors de la suppression de la taille :", error);
    } finally {
      isFormLoading.value = false;
      isDeleteDialogVisible.value = false;
      sizeToDelete.value = null;
    }
  }
}

async function handleFormSubmit(formData: Partial<ISize>) {
  isFormLoading.value = true;
  try {
    if (selectedSize.value) {
      await sizeStore.updateSize(selectedSize.value._id, formData);
      toast.success("Taille mise à jour avec succès!");
    } else {
      await sizeStore.createSize(formData);
      toast.success("Taille créée avec succès!");
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

