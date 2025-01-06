<template>
  <div class="container mx-auto p-6">

    <div class="flex flex-col lg:flex-row gap-6">
      <FilterSidebar
        @update-filters="applyFilters"
      />

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product._id"
          :image="product.images?.[0]?.url || ''"
          :title="product.name"
          :description="product.description || ''"
          :priceVat="getProductPrice(product)"
          :isActive="product.isActive"
          @click="goToProductDetails(product._id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted,} from "vue";
import { useProductStore } from "../../stores/modules/product.store";
import FilterSidebar from "../../components/FilterSidebar.vue";
import ProductCard from "../../components/ProductCard.vue";
import { useRouter } from "vue-router";
import type { IProductWithVariants } from "../../api/product/product.types"; 

const productStore = useProductStore();
const router = useRouter();


const filteredProducts = computed(() => productStore.filteredProducts);

const applyFilters = (filters: {
  name?: string;
  categoryIds?: string[];
  sizeIds?: string[];
  colorIds?: string[];
  minPrice?: number;
  maxPrice?: number;
}) => { 
  productStore.applyFilters(filters);
};

const goToProductDetails = (id: string) => {
  router.push({ name: "ProductDetails", params: { id } });
};

const getProductPrice = (product: IProductWithVariants): number => {
  return product.variants?.[0]?.priceVat || 0;
};

onMounted(() => {
  productStore.loadInitialData();
});
</script>

