<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des Produits</h1>

    <p class="mt-4 mb-4 text-sm">
      Vous pouvez gérer les produits de l'application ici. Vous pouvez créer,
      rechercher, filtrer, éditer, supprimer, activer ou désactiver les
      produits.
    </p>

    <div
      v-if="productStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{
        productStore.error ||
        "Une erreur est survenue lors de la récupération des produits."
      }}
    </div>

    <div
      v-if="productStore.isLoading"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredProducts"
      :enableSort="true"
      :enablePagination="true"
      :pageSize="10"
      :enableMultiSelect="true"
      :selectedItems="selectedProductIds"
      @row-click="openEditModal"
      @bulk-delete="bulkDeleteProducts"
      @update:selectedItems="updateSelectedProductIds"
    >
      <template #table-controls>
        <div class="flex flex-wrap items-center gap-4 mb-4">
      <!-- Zone gauche : SearchBar + les 3 FilterSelect -->
      <div class="flex flex-wrap gap-4 items-center grow">
        <SearchBar
          v-model="searchQuery"
          placeholder="Rechercher par nom ou description"
          :searchMode="'front'"
          @search="handleSearch"
          class="w-full lg:w-auto"
        />

        <FilterSelect
          v-model="selectedCategory"
          :options="categoryOptions"
          placeholder="Filtrer par Catégorie"
          :isMultiple="false"
          class="w-48"
        />

        <FilterSelect
          v-model="selectedFeature"
          :options="featureOptions"
          placeholder="Par Caractéristique"
          :isMultiple="false"
          class="w-48"
        />

        <FilterSelect
          v-model="selectedStatus"
          :options="statusOptions"
          placeholder="Filtrer par Statut"
          :isMultiple="false"
          class="w-48"
        />
      </div>

      <!-- Zone droite : Bouton Créer un Produit -->
      <div class="flex-none">
        <BaseButton
          color="primary"
          @click="openCreateModal"
          label="Créer un Produit"
        />
      </div>
    </div>

      </template>

      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="
              openEditModal(item);
              closeActionMenu();
            "
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editer
          </button>

          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="
              confirmDelete(item);
              closeActionMenu();
            "
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Supprimer
          </button>

          <button
            v-if="item.isActive"
            class="flex items-center text-yellow-500 hover:text-yellow-700"
            @click.stop="
              confirmDeactivate(item);
              closeActionMenu();
            "
          >
            <NoSymbolIcon class="w-4 h-4 mr-1" /> Désactiver
          </button>
          <button
            v-else
            class="flex items-center text-green-500 hover:text-green-700"
            @click.stop="
              confirmActivate(item);
              closeActionMenu();
            "
          >
            <CheckCircleIcon class="w-4 h-4 mr-1" /> Activer
          </button>

          <button
            class="flex items-center text-indigo-500 hover:text-indigo-700"
            @click.stop="
              duplicateProduct(item);
              closeActionMenu();
            "
          >
            <DocumentDuplicateIcon class="w-4 h-4 mr-1" /> Dupliquer
          </button>
        </div>
      </template>

      <template #priceRange="{ item }">
        <span v-if="item.hasVariants">{{ item.priceRange }}</span>
        <span v-else>{{ item.priceVat }} €</span>
      </template>

      <template #status="{ item }">
        <span
          :class="[
            'px-4 py-1 rounded text-white text-xs',
            item.isActive ? 'bg-green-500' : 'bg-red-500',
          ]"
        >
          {{ item.isActive ? "Actif" : "Inactif" }}
        </span>
      </template>

      <template #categories="{ item }">
        <span>
          {{ getCategoryNames(item.categoryIds).join(", ") }}
        </span>
      </template>

      <template #features="{ item }">
        <span>
          {{ getFeatureNames(item.featureIds).join(", ") }}
        </span>
      </template>
    </Table>

    <ConfirmationDialog
      :visible="isConfirmDeleteVisible"
      @close="isConfirmDeleteVisible = false"
      @confirm="deleteProduct"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir supprimer le produit ${productToDelete?.name} ? Cette action est irréversible.`"
      confirmText="Supprimer"
      cancelText="Annuler"
    />

    <ConfirmationDialog
      :visible="isConfirmDeactivateVisible"
      @close="isConfirmDeactivateVisible = false"
      @confirm="deactivateProduct"
      title="Confirmer la Désactivation"
      :message="`Êtes-vous sûr de vouloir désactiver le produit ${productToDeactivate?.name} ?`"
      confirmText="Désactiver"
      cancelText="Annuler"
    />

    <ConfirmationDialog
      :visible="isConfirmActivateVisible"
      @close="isConfirmActivateVisible = false"
      @confirm="activateProduct"
      title="Confirmer l'Activation"
      :message="`Êtes-vous sûr de vouloir activer le produit ${productToActivate?.name} ?`"
      confirmText="Activer"
      cancelText="Annuler"
    />

    <ProductCreateModal
  :visible="isFormModalVisible"
  :productData="productToEdit"
  :categoryOptions="categoryOptions"
  :featureOptions="featureOptions"
  :colorOptions="colorOptions"
  @close="isFormModalVisible = false"
  @submit="handleCreateOrUpdateProduct"
  :submitLabel="formSubmitLabel"
  :loading="isFormLoading"
/>

    <Loader
      :visible="isFormLoading"
      class="w-6 h-6 text-primary animate-spin"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../../../stores/modules/product.store.ts";
import { useSizeStore } from "../../../stores/modules/size.store.ts";
import { useColorStore } from "../../../stores/modules/color.store.ts";
import { useCategoryStore } from "../../../stores/modules/category.store.ts";
import { useProductFeatureStore } from "../../../stores/modules/productFeature.store.ts";
import SearchBar from "../../../components/SearchBar.vue";
import FilterSelect from "../../../components/FilterSelect.vue";
import Table from "../../../components/Table.vue";
import ConfirmationDialog from "../../../components/ConfirmationDialog.vue";
import ProductCreateModal from "../../../forms/modules/admin/product/ProductFormModal.vue";
import Loader from "../../../components/BaseLoader.vue";
import BaseButton from "../../../components/form/BaseButton.vue";

import {
  PencilSquareIcon,
  TrashIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/24/solid";

import { IProduct } from "../../../api/product/product.types.ts";
import { useToast } from "vue-toast-notification";
import { formatDateTime } from "../../../utils/date.ts";

interface Option {
  label: string;
  value: string;
}

const productStore = useProductStore();
const sizeStore = useSizeStore();
const colorStore = useColorStore();
const categoryStore = useCategoryStore();
const featureStore = useProductFeatureStore();

const $toast = useToast();

const searchQuery = ref("");
const selectedCategory = ref<string | null>(null);
const selectedFeature = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);

const selectedProductIds = ref<string[]>([]);

const categoryOptions = computed<Option[]>(() =>
  categoryStore.categories.map((category) => ({
    label: category.name,
    value: category._id,
  }))
);

const featureOptions = computed<Option[]>(() =>
  featureStore.productFeatures.map((feature) => ({
    label: feature.name,
    value: feature._id,
  }))
);

const sizeOptions = computed<Option[]>(() =>
  sizeStore.sizes.map((size) => ({
    label: size.name,
    value: size._id,
  }))
);

const colorOptions = computed<Option[]>(() =>
  colorStore.colors.map((color) => ({
    label: color.name,
    value: color._id,
  }))
);

const statusOptions = computed<Option[]>(() => [
  { label: "Actif", value: "Active" },
  { label: "Inactif", value: "Inactive" },
]);

const columns = [
  { key: "name", label: "Nom", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "priceRange", label: "Prix", sortable: true },
  { key: "categories", label: "Catégories", sortable: false },
  { key: "features", label: "Caractéristiques", sortable: false },
  {
    key: "status",
    label: "Statut",
    sortable: true,
    align: "center" as "center",
  },
  {
    key: "createdAt",
    label: "Date Création",
    sortable: true,
    format: (value: string) => formatDateTime(new Date(value), false),
    align: "center" as "center",
  },
];

const productData = computed<Partial<IProduct> | undefined>(() => productToEdit.value || undefined);

const isConfirmDeleteVisible = ref(false);
const isConfirmDeactivateVisible = ref(false);
const isConfirmActivateVisible = ref(false);
const isFormModalVisible = ref(false);

const productToDelete = ref<IProduct | null>(null);
const productToDeactivate = ref<IProduct | null>(null);
const productToActivate = ref<IProduct | null>(null);
const productToEdit = ref<IProduct | null>(null);

const isFormLoading = ref(false);

const formSubmitLabel = computed(() =>
  productToEdit.value ? "Mettre à jour" : "Créer"
);

onMounted(async () => {
  try {
    await sizeStore.fetchSizes();
    await colorStore.fetchColors();
    await categoryStore.fetchCategories();
    await featureStore.fetchProductFeatures();
    await productStore.getFilters();
    await productStore.fetchProductsByStatus(true);
  } catch (error) {
    $toast.error("Erreur lors du chargement des données initiales.", {
      position: "top",
      duration: 3000,
    });
  }
});

const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      !selectedCategory.value ||
      product.categoryIds.includes(selectedCategory.value);
    const matchesFeature =
      !selectedFeature.value ||
      product.featureIds.includes(selectedFeature.value);
    const matchesStatus =
      !selectedStatus.value ||
      (selectedStatus.value === "Active" && product.isActive) ||
      (selectedStatus.value === "Inactive" && !product.isActive);
    return matchesSearch && matchesCategory && matchesFeature && matchesStatus;
  });
});

const getCategoryNames = (categoryIds: string[]) => {
  return categoryStore.categories
    .filter((cat) => categoryIds.includes(cat._id))
    .map((cat) => cat.name);
};

const getFeatureNames = (featureIds: string[]) => {
  return featureStore.productFeatures
    .filter((feature) => featureIds.includes(feature._id))
    .map((feature) => feature.name);
};

function handleSearch(query: string) {
  searchQuery.value = query;
}

function openCreateModal() {
  productToEdit.value = null;
  isFormModalVisible.value = true;
}

function openEditModal(product: IProduct) {
  productToEdit.value = product;
  isFormModalVisible.value = true;
}

function closeFormModal() {
  isFormModalVisible.value = false;
  productToEdit.value = null;
}

interface ProductFormData {
  name: string;
  description: string;
  priceEtx: number;
  categoryIds: string[];
  featureIds: string[];
  colorIds: string[];
  images: File[]; // ou tout autre format de gestion
}

function handleCreateOrUpdateProduct(payload: {
  product: ProductFormData;
  variants: any[];
}) {
  isFormLoading.value = true;
  try {
    if (productToEdit.value) {
      productStore.updateProductWithVariants(
        productToEdit.value._id,
        payload.product,
        payload.variants
      );
    } else {
      productStore.createProductWithVariants(
        payload.product,
        payload.variants
      );
    }
  } catch (error) {
    // ...
  } finally {
    isFormLoading.value = false;
    isFormModalVisible.value = false;
  }
}


async function handleFormSubmit(formData: any) {
  isFormLoading.value = true;
  try {
    if (productToEdit.value) {
      const { product, variants } = formData;

      await productStore.updateProductWithVariants(
        productToEdit.value._id, 
        product,
        variants
      );
      $toast.success("Produit mis à jour avec succès!", {
        position: "top",
        duration: 3000,
      });
    } else {
      const { product, variants } = formData;
      await productStore.createProductWithVariants(
        product,
        variants
      );
      $toast.success("Produit créé avec succès!", {
        position: "top",
        duration: 3000,
      });
    }
    closeFormModal();
  } catch (error) {
    $toast.error("Erreur lors de la soumission du formulaire.", {
      position: "top",
      duration: 3000,
    });
  } finally {
    isFormLoading.value = false;
  }
}

function confirmDelete(product: IProduct) {
  productToDelete.value = product;
  isConfirmDeleteVisible.value = true;
}

async function deleteProduct() {
  if (productToDelete.value) {
    try {
      await productStore.deleteProduct(productToDelete.value._id);
      $toast.success("Produit supprimé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de la suppression du produit.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmDeleteVisible.value = false;
      productToDelete.value = null;
    }
  }
}

function confirmDeactivate(product: IProduct) {
  productToDeactivate.value = product;
  isConfirmDeactivateVisible.value = true;
}

async function deactivateProduct() {
  if (productToDeactivate.value) {
    try {
      await productStore.toggleProductActivation(
        productToDeactivate.value._id,
        false
      );
      $toast.success("Produit désactivé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de la désactivation du produit.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmDeactivateVisible.value = false;
      productToDeactivate.value = null;
    }
  }
}

function confirmActivate(product: IProduct) {
  productToActivate.value = product;
  isConfirmActivateVisible.value = true;
}

async function activateProduct() {
  if (productToActivate.value) {
    try {
      await productStore.toggleProductActivation(
        productToActivate.value._id,
        true
      );
      $toast.success("Produit activé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de l'activation du produit.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmActivateVisible.value = false;
      productToActivate.value = null;
    }
  }
}

async function duplicateProduct(product: IProduct) {
  try {
    await productStore.duplicateProduct(product._id);
    $toast.success("Produit dupliqué avec succès!", {
      position: "top",
      duration: 3000,
    });
  } catch (error) {
    $toast.error("Erreur lors de la duplication du produit.", {
      position: "top",
      duration: 3000,
    });
  }
}

async function bulkDeleteProducts() {
  // if (selectedProductIds.value.length > 0) {
  //   try {
  //     await productStore.deleteMultipleProducts(selectedProductIds.value);
  //     $toast.success(
  //       `${selectedProductIds.value.length} produit(s) supprimé(s) avec succès!`,
  //       {
  //         position: "top",
  //         duration: 3000,
  //       }
  //     );
  //     selectedProductIds.value = [];
  //   } catch (error) {
  //     $toast.error("Erreur lors de la suppression des produits.", {
  //       position: "top",
  //       duration: 3000,
  //     });
  //   }
  // }
}

function updateSelectedProductIds(ids: string[]) {
  selectedProductIds.value = ids;
}
</script>