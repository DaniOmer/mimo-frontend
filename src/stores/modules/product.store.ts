import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  fetchActiveProducts,
  fetchProductWithVariants,
  fetchProductFilters,
} from "../../api/product/product.api";
import { IProduct } from "../../api/product/product.types";
import { IProductVariant } from "../../api/product/productVariant.types";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as IProduct[],
    productsWithPriceInfo: [] as any[],
    selectedProduct: null as IProduct | null,
    filters: null as any | null,
    variants: [] as IProductVariant[],
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["products", "selectedProduct", "filters"],
  },

  getters: {
    isLoading: (state) => state.status === "pending",

    getProductsWithPriceInfo(state) {
      return state.productsWithPriceInfo;
    },

    uniqueCategories(state) {
      return (
        state.selectedProduct?.categoryIds?.map(
          (category: any) => category.name
        ) || []
      );
    },
    uniqueFeatures(state) {
      return (
        state.selectedProduct?.featureIds?.map(
          (feature: any) => feature.name
        ) || []
      );
    },
    uniqueSizes(state) {
      return state.variants
        ? [...new Set(state.variants.map((variant) => variant.sizeId.name))]
        : [];
    },
    uniqueColors(state) {
      return state.variants
        ? state.variants.map((variant) => ({
            name: variant.colorId.name,
            hexCode: variant.colorId.hexCode,
          }))
        : [];
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
        this.status = "success";
      } else {
        this.error = error.value;
        this.status = "failed";
      }
    },

    async getProductDetails(productId: string) {
      const { execute, status, error, data } = useApiRequest();

      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }
      await execute(() =>
        fetchProductWithVariants(productId, this.controller!.signal)
      );

      if (data.value) {
        this.selectedProduct = data.value.data.product;
        this.variants = data.value.data.variants;
      } else {
        this.selectedProduct = null;
        this.variants = [];
      }

      this.selectedProduct = data.value;
      this.error = error.value;
      this.status = status.value;
    },

    transformProducts() {
      this.productsWithPriceInfo = this.products.map((product) => {
        if (product.variants?.length) {
          const prices = product.variants.map((variant) => variant.priceVat);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          return {
            ...product,
            priceRange: `${minPrice} - ${maxPrice}`,
            hasVariants: true,
          };
        } else {
          return {
            ...product,
            priceVat: product.priceVat,
            hasVariants: false,
          };
        }
      });
    },

    resetSelectedProduct() {
      this.selectedProduct = null;
    },
  },
});
