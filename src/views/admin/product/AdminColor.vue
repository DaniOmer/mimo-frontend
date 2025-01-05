<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des couleurs</h1>

    <div
      v-if="colorStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        colorStore.error ||
        "Une erreur est survenue lors de la récupération des couleurs."
      }}
    </div>

    <div
      v-if="colorStore.loading"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredColors"
      :enableSort="true"
      :enablePagination="true"
      :pageSize="10"
      :enableActions="true"
    >
      <template #table-title>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Liste des couleurs</h2>
        </div>
      </template>

      <template #table-controls>
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <SearchBar
            v-model="searchQuery"
            placeholder="Rechercher par nom ou groupe de couleur"
            @search="handleSearch"
          />

          <div class="flex gap-4">
            <BaseButton
              color="primary"
              @click="openAddModal"
              label="Ajouter une couleur"
            />
          </div>
        </div>
      </template>

      <template #hexCode="{ item }">
        <div class="flex items-center">
          <span
            class="inline-block w-4 h-4 rounded-full mr-2"
            :style="{ backgroundColor: item.hexCode }"
          ></span>
          <span>{{ item.hexCode }}</span>
        </div>
      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="
              editColor(item);
              closeActionMenu();
            "
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editer
          </button>
          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="
              confirmDeleteColor(item);
              closeActionMenu();
            "
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Supprimer
          </button>
        </div>
      </template>
    </Table>

    <ColorFormModal
      :visible="isModalVisible"
      :initialData="selectedColor"
      :loading="isFormLoading"
      @submit="handleFormSubmit"
      @close="closeModal"
    />

    <ConfirmationDialog
      :visible="isDeleteDialogVisible"
      @close="isDeleteDialogVisible = false"
      @confirm="deleteColor"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la couleur ${colorToDelete?.name} ? Cette action est irréversible.`"
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
import { useColorStore } from "../../../stores/modules/color.store";
import Table from "../../../components/Table.vue";
import ConfirmationDialog from "../../../components/ConfirmationDialog.vue";
import ColorFormModal from "../../../forms/modules/admin/product/ColorFormModal.vue";
import { IColor } from "../../../api/";
import { formatDateTime } from "../../../utils/";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const colorStore = useColorStore();

const isDeleteDialogVisible = ref(false);
const colorToDelete = ref<IColor | null>(null);
const isModalVisible = ref(false);
const selectedColor = ref<IColor | null>(null);
const isFormLoading = ref(false);

const searchQuery = ref("");

const columns = [
  { key: "name", label: "Nom", sortable: true },
  { key: "hexCode", label: "Code Hexadécimal", sortable: true },
  {
    key: "isTrending",
    label: "Tendance",
    sortable: true,
    format: (value: boolean) => (value ? "Oui" : "Non"),
  },
  { key: "colorGroup", label: "Groupe de Couleur", sortable: true },
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
  await colorStore.fetchColors();
});

const colors = computed(() => colorStore.colors);

const filteredColors = computed(() => {
  if (!searchQuery.value) return colors.value;
  const query = searchQuery.value.toLowerCase();
  return colors.value.filter(
    (color: IColor) =>
      color.name.toLowerCase().includes(query) ||
      (color.colorGroup && color.colorGroup.toLowerCase().includes(query))
  );
});

function openAddModal() {
  selectedColor.value = null;
  isModalVisible.value = true;
}

function editColor(color: IColor) {
  selectedColor.value = color;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedColor.value = null;
}

function confirmDeleteColor(color: IColor) {
  colorToDelete.value = color;
  isDeleteDialogVisible.value = true;
}

async function deleteColor() {
  if (colorToDelete.value) {
    isFormLoading.value = true;
    try {
      await colorStore.deleteColor(colorToDelete.value._id);
      toast.success("Couleur supprimée avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la couleur.");
      console.error("Erreur lors de la suppression de la couleur :", error);
    } finally {
      isFormLoading.value = false;
      isDeleteDialogVisible.value = false;
      colorToDelete.value = null;
    }
  }
}

async function handleFormSubmit(formData: Partial<IColor>) {
  isFormLoading.value = true;
  try {
    if (selectedColor.value) {
      await colorStore.updateColor(selectedColor.value._id, formData);
      toast.success("Couleur mise à jour avec succès!");
    } else {
      await colorStore.createColor(formData);
      toast.success("Couleur créée avec succès!");
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
