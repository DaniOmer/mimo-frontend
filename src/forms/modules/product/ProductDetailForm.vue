<template>
  <form @submit.prevent="handleSubmit">
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-x-2"> -->
    <!-- Size -->
    <!-- <div v-if="sizes.length" class="mt-4">
        <label for="size" class="block font-semibold">Taille</label>
        <select id="size" v-model="selectedSize" class="border w-full p-2 mt-2">
          <option v-for="size in sizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <p v-if="errors.size" class="mt-2 text-sm text-red-600">
          {{ errors.size }}
        </p>
      </div> -->

    <!-- Color -->
    <!-- <div v-if="colors.length" class="mt-4">
        <label for="color" class="block font-semibold">Couleur</label>
        <select
          id="color"
          v-model="selectedColor"
          class="border w-full p-2 mt-2"
        >
          <option v-for="color in colors" :key="color" :value="color">
            {{ color }}
          </option>
        </select>
        <p v-if="errors.color" class="mt-2 text-sm text-red-600">
          {{ errors.color }}
        </p>
      </div> -->
    <!-- </div> -->

    <!-- Quantity -->
    <div class="mt-4">
      <label for="quantity" class="block font-semibold">Quantité</label>
      <input
        id="quantity"
        type="number"
        v-model="quantity"
        class="border w-full p-2 mt-2"
        min="1"
      />
      <p v-if="errors.quantity" class="mt-2 text-sm text-red-600">
        {{ errors.quantity }}
      </p>
    </div>

    <div class="mt-6">
      <BaseButton type="submit" label="Ajouter au panier" class="w-full">
        Ajouter au panier
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseButton from "../../../components/form/BaseButton.vue";
import productDetailsSchema from "../../schema/productDetailsSchema";
import { useFormValidation } from "../../../composables/useFormValidation";

const emit = defineEmits<{
  (event: "submit", formData: any): void;
}>();

const quantity = ref<number>(1);
const { errors, validate } = useFormValidation(productDetailsSchema);

const handleSubmit = () => {
  const localFormData = {
    quantity: parseInt(quantity.value as any, 10),
  };

  if (!validate(localFormData)) {
    return;
  }
  emit("submit", localFormData);
};
</script>
