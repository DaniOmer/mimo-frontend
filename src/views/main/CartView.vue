<template>
  <section class="bg-white py-8">
    <div class="mx-auto max-w-screen-xl px-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Votre panier</h2>
        <div v-if="cart">
          <CountdownTimer
            :expireAt="cart?.expireAt"
            v-if="cart.items.length > 0 && cart.expireAt && remainingTime > 0"
          />
        </div>
      </div>
      <div class="flex gap-6 mt-6">
        <div class="flex-1 flex flex-col gap-y-4">
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
import CountdownTimer from "../../components/CountdownTimer.vue";

const cartStore = useCartStore();
const { cart, items } = toRefs(cartStore);

const totalHT = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + item.product.priceEtx * item.quantity,
    0
  )
);
const tva = computed(() => totalHT.value * 0.2);
const total = computed(() => totalHT.value + tva.value);

const remainingTime = computed(() => {
  const expireAt = new Date(cart.value.expireAt);
  const currentTime = new Date();
  return expireAt - currentTime;
});

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
