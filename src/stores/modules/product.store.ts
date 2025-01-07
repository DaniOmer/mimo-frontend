// src/stores/product.store.ts
import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  fetchActiveProducts,
  fetchProductById,
  fetchProductFilters,
  fetchFilteredProducts,
} from "../../api/product/product.api";
import {
  fetchProductsByStatusAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  toggleProductActivationAdmin,
  createProductWithVariantsAdmin,
  updateProductWithVariantsAdmin,
  duplicateProductAdmin,
  searchProductsAdmin,
  fetchProductByIdAdmin,
} from "../../api/product/product.admin.api";
import { IProduct } from "../../api/product/product.types";
import { IProductVariant } from "../../api/product/productVariant.types";
// import { useSizeStore } from "./size.store";
// import { useColorStore } from "./color.store";
// import { useCategoryStore } from "./category.store";
// import { useProductFeatureStore } from "./productFeature.store";

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
    pick: ["products", "selectedProduct", "filters"],
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
    initializeController() {
      if (!this.controller) {
        this.controller = new AbortController();
      }
    },

    // Actions Publiques
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

    // Actions Administratives
    async fetchProductsByStatus(isActive: boolean) {
      const { execute, status, error, data } = useApiRequest<IProduct[]>();
      this.error = error.value;
      this.status = status.value;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        fetchProductsByStatusAdmin(isActive, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.products = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async createProduct(productData: Partial<IProduct>) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        createProductAdmin(productData, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.products.push(data.value);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async createProductWithVariants(
      product: Partial<IProduct>,
      variants: IProductVariant[]
    ) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        createProductWithVariantsAdmin(
          product,
          variants,
          this.controller!.signal
        )
      );

      if (status.value === "success" && data.value) {
        this.products.push(data.value);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async updateProductWithVariants(
      productId: string,
      product: Partial<IProduct>,
      variants: IProductVariant[]
    ) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        updateProductWithVariantsAdmin(
          productId,
          product,
          variants,
          this.controller!.signal
        )
      );

      if (status.value === "success" && data.value) {
        const index = this.products.findIndex((p) => p._id === productId);
        if (index !== -1) {
          this.products[index] = data.value;
        }
      }

      this.error = error.value;
      this.status = status.value;
    },

    async updateProduct(productId: string, productData: Partial<IProduct>) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        updateProductAdmin(productId, productData, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        const index = this.products.findIndex((p) => p._id === productId);
        if (index !== -1) {
          this.products[index] = data.value;
        }
      }

      this.error = error.value;
      this.status = status.value;
    },

    async deleteProduct(productId: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        deleteProductAdmin(productId, this.controller!.signal)
      );

      if (status.value === "success") {
        this.products = this.products.filter((p) => p._id !== productId);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async toggleProductActivation(productId: string, isActive: boolean) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        toggleProductActivationAdmin(
          productId,
          isActive,
          this.controller!.signal
        )
      );

      if (status.value === "success" && data.value) {
        const index = this.products.findIndex((p) => p._id === productId);
        if (index !== -1) {
          this.products[index] = data.value;
        }
      }

      this.error = error.value;
      this.status = status.value;
    },

    async duplicateProduct(productId: string) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        duplicateProductAdmin(productId, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.products.push(data.value);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async searchProducts(filters: Record<string, any>) {
      const { execute, status, error, data } = useApiRequest<IProduct[]>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        searchProductsAdmin(filters, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.products = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async fetchProductById(productId: string) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() =>
        fetchProductByIdAdmin(productId, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.selectedProduct = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    // Gestion des erreurs et réinitialisation
    resetStore() {
      this.products = [];
      this.selectedProduct = null;
      this.filters = null;
      this.error = null;
      this.status = "idle";
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },

    cancelRequest() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },
  },
});
