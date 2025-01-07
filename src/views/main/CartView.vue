<template>
  <section class="bg-white py-8 antialiased">
    <div class="mx-auto max-w-screen-xl px-4">
      <h2 class="text-xl font-semibold text-gray-900">Votre panier</h2>
      <div class="flex gap-6 mt-6">
        <div class="flex-1">
          <div v-for="item in items" :key="item.id">
            <CartItem
              :item="item"
              @remove="removeItem"
              @updateQuantity="updateItemQuantity"
            />
          </div>
        </div>

        <div class="flex-none">
          <CartSummary :totalHT="totalHT" :tva="tva" :total="total" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "../../stores/modules/cart.store";
import CartItem from "../../components/CartItem.vue";
import CartSummary from "../../components/CartSummary.vue";
import { onMounted, computed, toRefs } from "vue";

const cartStore = useCartStore();
const { items } = toRefs(cartStore);

const totalHT = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + item.product.priceEtx * item.quantity,
    0
  )
);
const tva = computed(() => totalHT.value * 0.2);
const total = computed(() => totalHT.value + tva.value);

const updateItemQuantity = ({ id, quantity }) => {
  try {
    cartStore.updateCartItemQuantity({ cartItemId: id, quantity: quantity });
  } catch (error) {
    console.error("Erreur lors de mise à jour de la quantité :", error);
  }
};

const removeItem = (id) => {
  try {
    cartStore.removeProductFromCart(id);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
  }
};

onMounted(async () => {
  await cartStore.getCart();
});
</script>
