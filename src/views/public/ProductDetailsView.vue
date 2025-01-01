<template>
  <div class="p-6 md:flex md:space-x-6 min-h-screen max-w-7xl mx-auto">
    <div class="flex-1">
      <ProductImages :images="product.images" />
    </div>

    <div class="flex-1 lg:w-3/5">
      <ProductDetails
        :title="product.name"
        :description="product.description"
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
import { ref, onMounted } from "vue";
import { useApiRequest } from "../../composables/useApiRequest";
import ProductImages from "../../components/ProductImages.vue";
import ProductDetails from "../../components/ProductDetails.vue";
import BaseButton from "../../components/form/BaseButton.vue";
import { fetchProductWithVariants } from "../../api/product/product.api";
import { useRoute } from "vue-router";
import { IProduct } from "../../api/product/product.types";
import { IProductVariant } from "../../api/product/productVariant.types";

const route = useRoute();
const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const product = ref<IProduct>({
  _id: "",
  name: "",
  images: [],
  priceVat: 0,
  categoryIds: [],
  featureIds: [],
});

const variants = ref<IProductVariant[]>([]);
const productFeatures = ref<string[]>([]);
const categories = ref<string[]>([]);
const sizes = ref<string[]>([]);
const colors = ref<{ name: string, hexCode: string }[]>([]);
const priceVat = ref<number>(0);
const selectedSize = ref<string | null>(null);
const selectedColor = ref<string | null>(null);
const { execute } = useApiRequest();

const loadProduct = async () => {
  const response = await execute(() => fetchProductWithVariants(productId));
  if (response) {
    const data = response.data;
    product.value = data.product;
    variants.value = data.variants;

    const uniqueCategories = new Set<string>(data.product.categoryIds.map((category: any) => category.name));
    const uniqueFeatures = new Set<string>(data.product.featureIds.map((feature: any) => feature.name));
    const uniqueSizes = new Set<string>(data.variants.map((variant: any) => variant.sizeId.name));
    const uniqueColors = new Map(data.variants.map((variant: any) => [variant.colorId.name, variant.colorId.hexCode]));
  
    categories.value = Array.from(uniqueCategories);
    productFeatures.value = Array.from(uniqueFeatures);
    sizes.value = Array.from(uniqueSizes);
    colors.value = Array.from(uniqueColors, ([name, hexCode]) => ({ name, hexCode }));
    priceVat.value = data.variants[0].priceVat;
  }
};

const updateVariant = () => {
  const variant = variants.value.find(
    (variant: IProductVariant) =>
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