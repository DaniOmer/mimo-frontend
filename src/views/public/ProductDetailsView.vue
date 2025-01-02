<template>
  <div class="p-6 md:flex md:space-x-6 min-h-screen max-w-7xl mx-auto">
    <div class="flex-1">
      <ProductImages :images="product?.images || []" />
    </div>

    <div class="flex-1 lg:w-3/5">
      <ProductDetails
        :title="product?.name"
        :description="product?.description"
        :product="product"
        :categories="categories"
        :features="productFeatures"
        :variants="variants"
        :sizes="sizes"
        :colors="colors"
        :price="priceVat"
        :selectedSize="selectedSize"
        :selectedColor="selectedColor"
        @update-variant="updateVariant"
      />
      <div class="mt-6">
        <BaseButton 
          @click="addToCart" 
          label="Ajouter au panier"
          class="w-full md:w-2/3 lg:w-1/2"
        >
          Ajouter au panier
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import ProductImages from "../../components/ProductImages.vue";
import ProductDetails from "../../components/ProductDetails.vue";
import BaseButton from "../../components/form/BaseButton.vue";
import { useProductStore } from "../../stores/modules/product.store";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const productStore = useProductStore();
const product = computed(() => productStore.product);
const variants = computed(() => productStore.variants);
const productFeatures = ref<string[]>([]);
const categories = ref<string[]>([]);
const sizes = ref<string[]>([]);
const colors = ref<{ name: string, hexCode: string }[]>([]);
const priceVat = ref<number>(0);
const selectedSize = ref<string | null>(null);
const selectedColor = ref<string | null>(null);

const loadProduct = async () => {
  await productStore.loadProductWithVariants(productId);
  
  productFeatures.value = productStore.uniqueFeatures;
  categories.value = productStore.uniqueCategories;
  sizes.value = productStore.uniqueSizes;
  colors.value = productStore.uniqueColors;
  priceVat.value = productStore.variants[0]?.priceVat;
};

const updateVariant = () => {
  const variant = productStore.variants.find(
    (variant) =>
      variant.sizeId.name === selectedSize.value && variant.colorId.name === selectedColor.value
  );
  if (variant) {
    priceVat.value = variant.priceVat;
  }
};

const addToCart = () => {
  // Logique pour ajouter le produit au panier
  console.log("Produit ajouté au panier");
};

onMounted(() => {
  loadProduct();
});
</script>