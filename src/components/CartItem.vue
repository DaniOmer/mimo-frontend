<template>
  <div class="flex justify-between items-center border rounded-md shadow p-4">
    <div class="mr-20 border">
      <a href="#" class="w-20 md:order-1">
        <img class="h-20 w-20" :src="item?.image" alt="product image" />
      </a>
    </div>

    <div class="flex-1 flex flex-col gap-y-4">
      <a href="#" class="text-base font-medium text-gray-900 hover:underline">{{
        item?.product.name
      }}</a>

      <button
        @click="removeItem"
        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
      >
        <svg
          class="me-1.5 h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
        Supprimer
      </button>
    </div>

    <div>
      <button type="button" @click="decrementQuantity" class="quantity-button">
        <svg
          class="h-2.5 w-2.5 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="number"
        v-model="quantity"
        class="w-10 text-center text-sm"
      />
      <button type="button" @click="incrementQuantity" class="quantity-button">
        <svg
          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center ml-10">
      <div class="text-end">
        <p class="text-base font-bold text-gray-900">
          {{ item?.product.priceEtx * quantity }} €
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  item: Object,
});

const quantity = ref(props.item?.quantity);

watch(
  () => props.item?.quantity,
  (newQuantity) => {
    quantity.value = newQuantity;
  }
);

const emit = defineEmits(["remove", "updateQuantity"]);

const removeItem = () => {
  emit("remove", props.item?._id);
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    emit("updateQuantity", { id: props.item?._id, quantity: quantity.value });
  }
};

const incrementQuantity = () => {
  quantity.value++;
  emit("updateQuantity", { id: props.item?._id, quantity: quantity.value });
};
</script>

<style scoped>
.quantity-button {
  border: 1px solid gray;
  background-color: lightgray;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
}
</style>
