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
          <ProductFilterForm
            :filters="filters"
            :priceFilters="priceFilters"
            :onFilterChange="onFilterChange"
            :apply-price-filter="applyPriceFilter"
            :fetch-filtered-products="fetchFilteredProducts"
            :reset-filters="resetFilters"
          />
          <!-- Product grid -->
          <div
            v-if="!isLoading && products.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 w-full col-span-3 mx-auto"
          >
            <ProductCard
              v-for="product in products"
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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon, Squares2X2Icon } from "@heroicons/vue/20/solid";

import ProductFilterForm from "../../forms/modules/product/ProductFilterForm.vue";

const sortOptions = [
  { name: "Les plus populaires", href: "#", current: true },
  { name: "Les nouveautés", href: "#", current: false },
  { name: "Prix croissant", href: "#", current: false },
  { name: "Prix décroissant", href: "#", current: false },
];

import { onMounted, toRefs } from "vue";

import ProductCard from "../../components/ProductCard.vue";
import { useProductStore } from "../../stores/modules/product.store";

const productStore = useProductStore();
const { products, filters, error, isLoading } = toRefs(productStore);
const priceFilters = ref({ min: null, max: null });

const resetFilters = () => {
  filters.value.forEach((section) => {
    section.options.forEach((option) => {
      option.checked = false;
    });
  });
  priceFilters.value.min = null;
  priceFilters.value.max = null;
  updateURLParams();
};

const applyPriceFilter = () => {
  const params = new URLSearchParams(window.location.search);

  if (priceFilters.value.min) {
    params.set("price_min", priceFilters.value.min);
  }
  if (priceFilters.value.max) {
    params.set("price_max", priceFilters.value.max);
  }
  window.history.pushState({}, "", "?" + params.toString());
};

const getActiveFilters = () => {
  return filters.value.reduce((acc, section) => {
    const selectedOptions = section.options
      .filter((option) => option.checked)
      .map((option) => option.value);

    if (selectedOptions.length) {
      acc[section.id] = selectedOptions.join(",");
    }

    return acc;
  }, {});
};

const fetchFilteredProducts = async () => {
  try {
    const params = getActiveFilters();
    const features = [];
    const categoryIds = [];
    const colors = [];
    const sizes = [];
    for (const [key, value] of Object.entries(params)) {
      if (key === "feature") {
        features.push(...value.split(","));
      } else if (key === "category") {
        categoryIds.push(...value.split(","));
      }
    }
    const query = {
      price_min: priceFilters.value.min,
      price_max: priceFilters.value.max,
      features,
      categoryIds,
      colors,
      sizes,
    };
    await productStore.getFilteredProducts(query);
  } catch (err) {
    console.error("Erreur lors de la mise à jour des produits :", err);
  }
};

const loadProducts = async () => {
  try {
    await productStore.getFilters();
    await productStore.getActiveProducts();
    loadFiltersFromURL();

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
  fetchFilteredProducts();
};

const addParamsToLocation = (params) => {
  const currentUrl = window.location.href.split("?")[0];
  const urlParams = new URLSearchParams();

  for (const [key, values] of Object.entries(params)) {
    if (Array.isArray(values)) {
      values.forEach((value) => {
        urlParams.append(key, value);
      });
    } else {
      urlParams.set(key, values);
    }
  }

  const newUrl = `${currentUrl}?${urlParams.toString()}`;
  console.log("NEW GENERATED URL", newUrl);
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
  priceFilters.value.min = urlParams.get("price_min") || null;
  priceFilters.value.max = urlParams.get("price_max") || null;

  filters.value.forEach((section) => {
    section.options.forEach((option) => {
      option.checked =
        urlParams.has(section.id) && urlParams.get(section.id) === option.value;
    });
  });
  fetchFilteredProducts();
};

onMounted(async () => {
  await loadProducts();
});
</script>
