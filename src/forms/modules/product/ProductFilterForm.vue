<template>
  <form class="hidden lg:block">
    <Disclosure
      as="div"
      v-for="section in filters"
      :key="section.id"
      class="border-b border-gray-200 py-6"
      v-slot="{ open }"
    >
      <h3 class="-my-3 flow-root">
        <DisclosureButton
          class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span class="font-medium text-gray-900">{{ section.name }}</span>
          <span class="ml-6 flex items-center">
            <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
            <MinusIcon v-else class="size-5" aria-hidden="true" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel class="pt-6">
        <div class="space-y-4">
          <div
            v-for="option in section.options"
            :key="option.value"
            class="flex gap-3"
          >
            <FilterCheckBox
              :label="option.label"
              :name="section.id"
              :value="option.checked"
              :option="option"
              @update:filter="onFilterChange"
            />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <div class="border-b border-gray-200 py-6">
      <h3 class="-my-3 flow-root">
        <span class="font-medium text-gray-900">Prix</span>
      </h3>
      <div class="flex gap-4 mt-4">
        <input
          type="number"
          v-model="priceFilters.min"
          class="w-full border rounded-md p-2 text-sm"
          placeholder="Prix min"
          @change="applyPriceFilter"
        />
        <p v-if="errors.min" class="mt-2 text-sm text-red-600">
          {{ errors.min }}
        </p>
        <input
          type="number"
          v-model="priceFilters.max"
          class="w-full border rounded-md p-2 text-sm"
          placeholder="Prix max"
          @change="applyPriceFilter"
        />
        <p v-if="errors.max" class="mt-2 text-sm text-red-600">
          {{ errors.max }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <button
          @click.prevent="handleSubmit"
          class="mt-4 py-2 text-blue-500 rounded-md underline"
        >
          Appliquer
        </button>
        <button
          @click.prevent="resetFilters"
          class="mt-4 py-2 text-red-400 rounded-md underline"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";
import { useFormValidation } from "../../../composables/useFormValidation";
import FilterCheckBox from "../../../components/form/FilterCheckBox.vue";
import { PriceFiltersSchema } from "../../schema/priceFiltersSchema";

const { errors, validate } = useFormValidation(PriceFiltersSchema);

const localFormData = reactive({
  min: 0,
  max: 0,
});

const handleSubmit = () => {
  if (!validate(localFormData)) {
    return;
  }
  props.fetchFilteredProducts();
};

const props = defineProps<{
  filters: any[];
  priceFilters: {
    min: number;
    max: number;
  };
  loading?: boolean;
  applyPriceFilter: () => void;
  fetchFilteredProducts: () => void;
  resetFilters: () => void;
  onFilterChange: (filter: any) => void;
}>();

const emit = defineEmits(["submit"]);
</script>
