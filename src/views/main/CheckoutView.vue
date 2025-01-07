<template>
  <section class="bg-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Votre panier</h2>
        <div v-if="cart" class="flex items-baseline gap-2">
          <div
            v-if="cart.items.length > 0 && cart.expireAt && remainingTime > 0"
            class="flex items-center gap-2"
          >
            <span class="text-sm">expire dans</span>
            <CountdownTimer :expireAt="new Date(cart.expireAt)" />
          </div>
        </div>
      </div>
      <div class="flex gap-6 mt-6">
        <div class="flex-1 flex flex-col gap-y-4">
          <div v-for="item in items" :key="item._id">
            <CartItem
              :item="item"
              @remove="removeItem"
              @updateQuantity="updateItemQuantity"
            />
          </div>
        </div>

        <div class="flex-none">
          <CartSummary
            :totalHT="totalHT"
            :tva="tva"
            :total="total"
            :handleOrderSubmit="handleOrderSubmit"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { useCartStore } from "../../stores/modules/cart.store";
// import { useOrderStore } from "../../stores";
import CartItem from "../../components/CartItem.vue";
import CartSummary from "../../components/CartSummary.vue";
import { onMounted, computed, toRefs } from "vue";
import CountdownTimer from "../../components/CountDownTimer.vue";
import { IProduct } from "../../api/product/product.types";

const cartStore = useCartStore();
const router = useRouter();
const { cart, items } = toRefs(cartStore);

// const orderStore = useOrderStore();

const totalHT = computed(() =>
  cartStore.items.reduce((sum, item) => {
    const product = item.product as IProduct;
    return sum + product.priceEtx * item.quantity;
  }, 0)
);
const tva = computed(() => totalHT.value * 0.2);
const total = computed(() => totalHT.value + tva.value);

const remainingTime = computed(() => {
  const expireAt = new Date(cart.value?.expireAt as Date);
  const currentTime = new Date();
  return expireAt - currentTime;
});

const updateItemQuantity = ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  try {
    cartStore.updateCartItemQuantity({ cartItemId: id, quantity: quantity });
  } catch (error) {
    console.error("Erreur lors de mise à jour de la quantité :", error);
  }
};

const removeItem = (id: string) => {
  try {
    cartStore.removeProductFromCart(id);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article :", error);
  }
};

const handleOrderSubmit = async () => {
  try {
    // await cartStore.createOrder();
    router.push({ name: "paymentAddress" });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
  }
};

onMounted(async () => {
  await cartStore.getCart();
});
</script>
