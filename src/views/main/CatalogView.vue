<template>
  <!-- <h1 class="text-center text-2xl font-bold my-6">Collections</h1> -->
  <div class="flex gap-6 p-4">
    <FilterSidebar :categories="categories" :sizes="sizes" :colors="colors" @update-filters="applyFilters" />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :image="product.images?.[0]?.url"
        :title="product.name"
        :description="product?.description"
        @click="product && goToProductDetails(product._id)"
        class="h-64"
      />
    </div>
    <div v-if="error" class="text-red-500 text-center mt-4">
      Erreur lors du chargement des produits : {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProductCard from "../../components/ProductCard.vue";
import FilterSidebar from "../../components/FilterSidebar.vue";
import { useProductStore } from "../../stores/modules/product.store";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const categories = ref(productStore.categories);
const sizes = ref(productStore.sizes);
const colors = ref(productStore.colors);
const error = ref(productStore.error);

const filteredProducts = computed(() => {
  return productStore.filteredProducts;
});

const applyFilters = (filters: { categories: string[]; sizes: string[]; colors: string[] }) => {
  productStore.setFilters(filters);
  const queryParams = {
    categories: filters.categories.join(","),
    sizes: filters.sizes.join(","),
    colors: filters.colors.join(","),
  };
  router.push({ query: queryParams });
};

const goToProductDetails = (productId: string) => {
  router.push({ name: "ProductDetails", params: { id: productId } });
};

watch(() => route.query, () => {
  const { categories = "", sizes = "", colors = "" } = route.query;
  productStore.setFilters({
    categories: (typeof categories === 'string' ? categories : '').split(","),
    sizes: (typeof sizes === 'string' ? sizes : '').split(","),
    colors: (typeof colors === 'string' ? colors : '').split(","),
  });
}, { immediate: true });

onMounted(() => {
  productStore.loadInitialData();
});
</script>