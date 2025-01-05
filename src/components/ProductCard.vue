<template>
  <div class="w-full h-[450px]">
    <RouterLink :to="{ name: 'ProductDetails', params: { id: product._id } }">
      <div class="group relative">
        <img
          class="w-full h-full object-contain"
          src="https://picsum.photos/200/300"
          alt="product image"
        />
        <div
          class="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full h-[50px] bg-white bg-opacity-0 opacity-0 translate-y-4 group-hover:bg-opacity-70 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
        >
          Aperçu rapide
        </div>
      </div>
      <div class="text-center text-sm mt-4">
        <h2>{{ product.name }}</h2>
        <p>{{ product.priceVat ? product.priceVat : product.priceRange }} €</p>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "../api/product/product.types";

defineProps<{
  product: IProduct;
}>();
</script>
