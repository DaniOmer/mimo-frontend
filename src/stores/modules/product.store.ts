import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  fetchActiveProducts,
  fetchProductById,
  fetchProductFilters,
  fetchFilteredProducts,
} from "../../api/product/product.api";
import { IProduct } from "../../api/product/product.types";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as IProduct[],
    selectedProduct: null as IProduct | null,
    filters: [] as any[],
    error: null as string | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["products", "selectedProduct", "filters", "productsWithPriceInfo"],
  },

  getters: {
    isLoading: (state) => state.status === "pending",

    productCategories(state) {
      return [
        ...new Set(
          state.selectedProduct?.categories?.map((category) => category.name) ||
            []
        ),
      ];
    },

    productFeatures(state) {
      return [
        ...new Set(
          state.selectedProduct?.features?.map((feature) => feature.name) || []
        ),
      ];
    },
  },

  actions: {
    async getFilters() {
      const { execute, error, data, status } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => fetchProductFilters(this.controller!.signal));

      this.error = error.value;
      this.status = status.value;
      this.filters = data.value;
    },

    async getActiveProducts() {
      const { execute, error, data, status } = useApiRequest<IProduct[]>();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => fetchActiveProducts(this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.products = data.value;
        this.status = status.value;
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },

    async getProductDetails(productId: string) {
      const { execute, status, error, data } = useApiRequest();

      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }
      await execute(() => fetchProductById(productId, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.selectedProduct = data.value;
      } else {
        this.selectedProduct = null;
        this.error = error.value;
      }
      this.status = status.value;
    },

    async getFilteredProducts(filters: any) {
      const { execute, status, error, data } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }
      await execute(() =>
        fetchFilteredProducts(filters, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.products = data.value;
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },

    resetProductDetails() {
      this.selectedProduct = null;
    },
  },
});
