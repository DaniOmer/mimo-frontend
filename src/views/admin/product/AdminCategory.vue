<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des catégories</h1>

    <p class="mt-4 mb-4 text-sm">
        Vous pouvez gérer les catégories des produits.
    </p>

    <div
      v-if="categoryStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        categoryStore.error ||
        "Une erreur est survenue lors de la récupération des catégories."
      }}
    </div>

    <div
      v-if="categoryStore.status === 'pending'"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredCategories"
      :enableSort="true"
      :enablePagination="true"
      :enableActions="true"
      :enableMultiSelect="true"
      exportFileName="Export_categories.csv"
      @bulk-delete="deleteMultipleCategories"
    >

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
              label="Ajouter une categorie"
            />
          </div>
        </div>
      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="editCategory(item); closeActionMenu()"
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editer
          </button>
          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="confirmDeleteCategory(item); closeActionMenu()"
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Supprimer
          </button>
        </div>
      </template>

      <template #productCount="{ item }">
        <span>{{ item.productCount }}</span>
      </template>

    </Table>

    <CategoryFormModal
      :visible="isModalVisible"
      :initialData="selectedCategory"
      :loading="isFormLoading"
      @submit="handleFormSubmit"
      @close="closeModal"
    />

    <ConfirmationDialog
      :visible="isDeleteDialogVisible"
      @close="isDeleteDialogVisible = false"
      @confirm="deleteCategory"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir
    supprimer la catégorie ${categoryToDelete?.name} ? Cette action est
    irréversible.`"
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
import { useCategoryStore } from "../../../stores/";
import Table from "../../../components/Table.vue";
import ConfirmationDialog from "../../../components/ConfirmationDialog.vue";
import CategoryFormModal from "../../../forms/modules/admin/product/CategoryFormModal.vue";
import { ICategory } from "../../../api";
import { formatDateTime } from "../../../utils/"; 
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toast-notification"; 

const toast = useToast();

const categoryStore = useCategoryStore();

const isDeleteDialogVisible = ref(false);
const categoryToDelete = ref<ICategory | null>(null);
const isModalVisible = ref(false);
const selectedCategory = ref<ICategory | null>(null);
const isFormLoading = ref(false);

const searchQuery = ref("");

const columns = [
  { key: "name", label: "Nom", sortable: true },
  { key: "description", label: "Description", sortable: false },
  {
    key: "createdAt",
    label: "Date Création",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false)
  },
  {
    key: "updatedAt",
    label: "Date Mise à Jour",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false)
  },
];

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const categories = computed(() => categoryStore.categories);

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  const query = searchQuery.value.toLowerCase();
  return categories.value.filter(
    (category: ICategory) =>
      category.name.toLowerCase().includes(query) ||
      (category.description &&
        category.description.toLowerCase().includes(query))
  );
});

function openAddModal() {
  selectedCategory.value = null;
  isModalVisible.value = true;
}

function editCategory(category: ICategory) {
  selectedCategory.value = category;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedCategory.value = null;
}

function confirmDeleteCategory(category: ICategory) {
  categoryToDelete.value = category;
  isDeleteDialogVisible.value = true;
}

async function deleteCategory() {
  if (categoryToDelete.value) {
    isFormLoading.value = true;
    try {
      await categoryStore.deleteCategory(categoryToDelete.value._id);
      toast.success("Catégorie supprimée avec succès!");
      categoryStore.fetchCategories();
    } catch (error) {
      toast.error("Erreur lors de la suppression de la catégorie.");
      console.error("Erreur lors de la suppression de la catégorie :", error);
    } finally {
      isFormLoading.value = false;
      isDeleteDialogVisible.value = false;
      categoryToDelete.value = null;
    }
  }
}

async function deleteMultipleCategories (selectedKeys: string[]) {
   if (selectedKeys.length) {
    try {
      await categoryStore.deleteMutipleCategories(selectedKeys);
      toast.success(`${selectedKeys.length} catégories supprimées avec succès!`)
      categoryStore.fetchCategories();
    } catch (error) {
        toast.error("Erreur lors de la suppression des catégories.");
       console.error("Erreur lors de la suppression de la catégorie :", error);
    } 
  }
}

async function handleFormSubmit(formData: Partial<ICategory>) {
  isFormLoading.value = true;
  try {
    if (selectedCategory.value) {
      await categoryStore.updateCategory(selectedCategory.value._id, formData);
      toast.success("Catégorie mise à jour avec succès!");
      categoryStore.fetchCategories();
    } else {
      await categoryStore.createCategory(formData);
      toast.success("Catégorie créée avec succès!");
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

