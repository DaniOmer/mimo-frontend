<template>
  <div class="catalog">
    <h1 class="text-center text-2xl font-bold my-6">Collections</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <CardProduct
        v-for="product in products"
        :key="product._id"
        :image="product.images?.[0]"
        :title="product.name"
        :description="product.description"
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
import CardProduct from "../../components/layout/CardProduct.vue";
import { fetchProducts } from "../../api/product/product.api";
import { IProduct } from "../../api/product/product.types";

const products = ref<IProduct[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const loadProducts = async () => {
  try {
    const response = await fetchProducts();
    console.log(response);
    products.value = response.data;
    console.log(products.value?.[0].name);
    console.log(typeof(products.value?.[0].images?.[0]));
  } catch (err) {
    error.value = "Impossible de charger les produits.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.catalog {
  padding: 1rem;
}
</style>