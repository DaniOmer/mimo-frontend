<template>
  <div>
    <!-- CREATE A CUSTOM COMPONENT LATER TO HANDLE THE ERROR -->
    <div v-if="error">
      <h1>Produit introuvable</h1>
      <p>{{ error }}</p>
    </div>

    <div v-else class="p-6 md:flex md:space-x-6 min-h-screen max-w-7xl mx-auto">
      <div class="flex-1">
        <img
          class="w-full h-full object-contain"
          src="https://picsum.photos/200/300"
          alt="product image"
        />
      </div>

      <div class="flex-1 lg:w-3/5">
        <div class="max-w-4xl mx-auto">
          <div class="flex justify-between items-center">
            <h1 class="text-base font-medium">{{ selectedProduct?.name }}</h1>
            <p class="text-xl text-primary my-4">
              {{ selectedProduct?.priceVat }} €
            </p>
          </div>

          <p class="text-sm text-primary">
            {{ selectedProduct?.description }}
          </p>

          <ProductDetailForm @submit="handleFormSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import ProductDetailForm from "../../forms/modules/product/ProductDetailForm.vue";
import { useProductStore } from "../../stores/modules/product.store";
import { useCartStore } from "../../stores/modules/cart.store";
import { IProduct } from "../../api/product/product.types";

const props = defineProps<{ id: string }>();
const productStore = useProductStore();
const { selectedProduct, error } = toRefs(productStore);

const cartStore = useCartStore();

const handleFormSubmit = (formData: { quantity: number }) => {
  try {
    const existingItem = cartStore.items.find((item) => {
      const product = item.product as IProduct;
      return product._id === selectedProduct.value?._id;
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + formData.quantity;
      cartStore.updateCartItemQuantity({
        cartItemId: existingItem._id,
        quantity: newQuantity,
      });
    } else {
      cartStore.addToCart({
        productId: selectedProduct.value?._id as string,
        quantity: formData.quantity,
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit au panier :", error);
  }
};

const loadProduct = async () => {
  try {
    await productStore.getProductDetails(props.id);
  } catch (error) {
    console.error("Erreur lors du chargement du produit :", error);
  }
};

onMounted(() => {
  loadProduct();
});
</script>
