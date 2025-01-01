<template>
  <div class="p-4">
    <h1 class="text-center text-2xl font-bold my-6">Collections</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :image="product.images?.[0]"
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
import { fetchProducts } from "../../api/product/product.api";
import { IProduct } from "../../api/product/product.types";
import ProductCard from "../../components/ProductCard.vue";
import { useApiRequest } from "../../composables/useApiRequest";

const products = ref<IProduct[]>([]);
const { loading, error, execute } = useApiRequest<IProduct[]>();
const router = useRouter();

const loadProducts = async () => {
  const response = await execute(fetchProducts);
  if (response && response.data) {
    products.value = response.data;
  } else {
    products.value = [];
  }
};

const goToProductDetails = (productId: string) => {
  router.push({ name: "ProductDetails", params: { id: productId } });
};

onMounted(() => {
  loadProducts();
});
</script>