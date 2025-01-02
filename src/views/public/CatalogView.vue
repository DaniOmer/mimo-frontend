<template>
  <div class="p-4">
    <h1 class="text-center text-2xl font-bold my-6">Collections</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :image="product.images[0]?.url"
        :title="product.name"
        :description="product.description"
        @click="goToProductDetails(product._id)"
      />
    </div>
    <div v-if="error" class="text-red-500 text-center mt-4">
      Erreur lors du chargement des produits : {{ error }}
    </div>
    <div v-else-if="loading" class="text-center mt-4">
      Chargement des produits...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { IProduct } from "../../api/product/product.types";
import ProductCard from "../../components/ProductCard.vue";
import { useApiRequest } from "../../composables/useApiRequest";
import { useProductStore } from "../../stores/modules/product.store";

const productStore = useProductStore();
const products = ref(productStore.products);
const { loading, error } = useApiRequest<IProduct[]>();
const router = useRouter();

const loadProducts = async () => {
  await productStore.loadProducts();
};

const goToProductDetails = (productId: string) => {
  router.push({ name: "ProductDetails", params: { id: productId } });
};

onMounted(() => {
  loadProducts();
});
</script>