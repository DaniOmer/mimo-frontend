import { defineStore } from "pinia";
import {
  fetchAllProducts,
  searchProducts,
  fetchProductById,
  IProductFeature,
  IProductWithVariants,
} from "../../api/";
import { useCategoryStore } from "./category.store";
import { useColorStore } from "./color.store";
import { useSizeStore } from "./size.store";
import { useProductFeatureStore } from "./productFeature.store";


export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as IProductWithVariants[],
    product: null as IProductWithVariants | null,
    categories: [] as { _id: string; name: string }[],
    colors: [] as { _id: string; name: string; hexCode: string }[],
    sizes: [] as { _id: string; name: string }[],
    productFeatures: [] as IProductFeature[],
    filters: {
      name: "",
      categoryIds: [] as string[],
      colorIds: [] as string[],
      sizeIds: [] as string[],
      minPrice: null as number | null,
      maxPrice: null as number | null,
    },
    loading: false,
    error: null as string | null,
  }),

  getters: {
    filteredProducts(state) {
      return state.products.filter((product) => {
        const matchesName =
          !state.filters.name ||
          product.name.toLowerCase().includes(state.filters.name.toLowerCase());
        const matchesCategory =
          !state.filters.categoryIds.length ||
          product.categoryIds?.some((id) =>
            state.filters.categoryIds.includes(id)
          );
        const matchesColor =
          !state.filters.colorIds.length ||
          product.featureIds?.some((id) => state.filters.colorIds.includes(id));
        const matchesSize =
          !state.filters.sizeIds.length ||
          product.variants?.some((variant) =>
            state.filters.sizeIds.includes(variant.sizeId)
          );
        const matchesMinPrice =
          state.filters.minPrice === null ||
          product.variants?.some((variant) => variant.priceVat >= state.filters.minPrice!);
        const matchesMaxPrice =
          state.filters.maxPrice === null ||
          product.variants?.some((variant) => variant.priceVat <= state.filters.maxPrice!);
        return (
          matchesName &&
          matchesCategory &&
          matchesColor &&
          matchesSize &&
          matchesMinPrice &&
          matchesMaxPrice
        );
      });
    },
  },

  actions: {
    async loadInitialData() {
      this.loading = true;

      const categoryStore = useCategoryStore();
      const colorStore = useColorStore();
      const sizeStore = useSizeStore();
      const featureStore = useProductFeatureStore();

      try {
        await Promise.all([
          categoryStore.fetchCategories(),
          colorStore.fetchColors(),
          sizeStore.fetchSizes(),
          featureStore.fetchProductFeatures(),
        ]);

        const products = await fetchAllProducts();
        this.products = products as IProductWithVariants[];

        this.categories = categoryStore.categories;
        this.colors = colorStore.colors;
        this.sizes = sizeStore.sizes;
        this.productFeatures = featureStore.productFeatures;
      } catch (err) {
        this.error = "Échec du chargement des données initiales.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(productId: string) {
      this.loading = true;
      try {
        const product = await fetchProductById(productId);
        this.product = product as IProductWithVariants;
      } catch (err) {
        this.error = `Échec de la récupération du produit avec l'ID ${productId}`;
      } finally {
        this.loading = false;
      }
    },

    async applyFilters(filters: {
      name?: string;
      categoryIds?: string[];
      colorIds?: string[];
      sizeIds?: string[];
      minPrice?: number;
      maxPrice?: number;
    }) {
      this.filters = { ...this.filters, ...filters };

      try {
        const adjustedFilters = {
          ...this.filters,
          minPrice: this.filters.minPrice ?? undefined,
          maxPrice: this.filters.maxPrice ?? undefined,
        };

        const products = await searchProducts(adjustedFilters);
        this.products = products as IProductWithVariants[];
      } catch (err) {
        this.error = "Échec de l'application des filtres.";
        console.error(err);
      }
    },
  },
});
