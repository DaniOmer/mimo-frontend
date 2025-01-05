<template>
  <div class="bg-white">
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
      >
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">
          Collection
        </h1>

        <div class="flex items-center">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sort
                <ChevronDownIcon
                  class="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem
                    v-for="option in sortOptions"
                    :key="option.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="option.href"
                      :class="[
                        option.current
                          ? 'font-medium text-gray-900'
                          : 'text-gray-500',
                        active ? 'bg-gray-100 outline-none' : '',
                        'block px-4 py-2 text-sm',
                      ]"
                      >{{ option.name }}</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <button
            type="button"
            class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span class="sr-only">View grid</span>
            <Squares2X2Icon class="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pb-24 pt-6">
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <!-- Filters -->
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
                  <span class="font-medium text-gray-900">{{
                    section.name
                  }}</span>
                  <span class="ml-6 flex items-center">
                    <PlusIcon v-if="!open" class="size-5" aria-hidden="true" />
                    <MinusIcon v-else class="size-5" aria-hidden="true" />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel class="pt-6">
                <div class="space-y-4">
                  <div
                    v-for="(option, optionIdx) in section.options"
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
          </form>

          <!-- Product grid -->
          <div
            v-if="!isLoading && productsWithPriceInfo.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 w-full col-span-3 mx-auto"
          >
            <ProductCard
              v-for="product in productsWithPriceInfo"
              :key="product._id"
              :product="product"
            />
          </div>
          <div v-if="error" class="text-red-500 text-center mt-4">
            Erreur lors du chargement des produits : {{ error }}
          </div>
          <div v-else-if="isLoading" class="text-center mt-4 animate-pulse">
            Chargement des produits...
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/vue/20/solid";

const sortOptions = [
  { name: "Les plus populaires", href: "#", current: true },
  { name: "Les nouveautés", href: "#", current: false },
  { name: "Prix croissant", href: "#", current: false },
  { name: "Prix décroissant", href: "#", current: false },
];

import { onMounted, toRefs } from "vue";
import { useRoute } from "vue-router";

import ProductCard from "../../components/ProductCard.vue";
import { useProductStore } from "../../stores/modules/product.store";
import BaseCheckbox from "../../components/form/BaseCheckbox.vue";
import FilterCheckBox from "../../components/form/FilterCheckBox.vue";

const productStore = useProductStore();
const { products, filters, error, isLoading, productsWithPriceInfo } =
  toRefs(productStore);

const loadProducts = async () => {
  try {
    await productStore.getFilters();
    await productStore.getActiveProducts();
    productStore.transformProducts();
    if (!products.value || products.value.length === 0) {
      console.error("Aucun produit disponible.");
    }
  } catch (err) {
    console.error("Erreur lors du chargement des produits :", err);
  }
};

const onFilterChange = (updateFilter) => {
  const filter = filters.value.find((f) => f.id === updateFilter.name);
  const option = filter.options.find(
    (o) => o.value === updateFilter.option.value
  );

  option.checked = !option.checked;
  addParamsToLocation(
    filters.value.reduce((acc, curr) => {
      acc[curr.id] = curr.options.filter((o) => o.checked).map((o) => o.value);
      return acc;
    }, {})
  );
};

const addParamsToLocation = (params) => {
  const currentUrl = window.location.href;

  const newUrl =
    currentUrl.split("?")[0] +
    "?" +
    Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

  if (window.location.href !== newUrl) {
    history.replaceState({}, "", newUrl);
  }
};

const updateURLParams = () => {
  const params = new URLSearchParams();

  filters.value.forEach((section) => {
    section.options.forEach((option) => {
      if (option.checked) {
        if (params.has(section.id)) {
          params.append(section.id, option.value);
        } else {
          params.set(section.id, option.value);
        }
      }
    });
  });

  window.history.replaceState({}, "", "?" + params.toString());
};

const loadFiltersFromURL = () => {
  if (!filters.value || !filters.value.length) {
    console.warn("No filters available to load from URL.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  filters.value.forEach((section) => {
    section.options.forEach((option) => {
      option.checked =
        urlParams.has(section.id) && urlParams.get(section.id) === option.value;
    });
  });
};

onMounted(async () => {
  await loadProducts();
  loadFiltersFromURL();
});
</script>
