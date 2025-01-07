// src/stores/product.store.ts
import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  fetchActiveProducts,
  fetchProductWithVariants,
  fetchProductFilters,
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

    // Actions Administratives
    async fetchProductsByStatus(isActive: boolean) {
      const { execute, status, error, data } = useApiRequest<IProduct[]>();
      this.error = error.value;
      this.status = status.value;

      this.initializeController();

      this.status = "pending";
      await execute(() => fetchProductsByStatusAdmin(isActive, this.controller!.signal));

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
      await execute(() => createProductAdmin(productData, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.products.push(data.value);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async createProductWithVariants(product: Partial<IProduct>, variants: IProductVariant[]) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;
  
      this.initializeController();
  
      this.status = "pending";
      await execute(() => createProductWithVariantsAdmin(product, variants, this.controller!.signal));
  
      if (status.value === "success" && data.value) {
        this.products.push(data.value);
      }
  
      this.error = error.value;
      this.status = status.value;
    },
  
    async updateProductWithVariants(productId: string, product: Partial<IProduct>, variants: IProductVariant[]) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;
  
      this.initializeController();
  
      this.status = "pending";
      await execute(() => updateProductWithVariantsAdmin(productId, product, variants, this.controller!.signal));
  
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
      await execute(() => updateProductAdmin(productId, productData, this.controller!.signal));

      if (status.value === "success" && data.value) {
        const index = this.products.findIndex(p => p._id === productId);
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
      await execute(() => deleteProductAdmin(productId, this.controller!.signal));

      if (status.value === "success") {
        this.products = this.products.filter(p => p._id !== productId);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async toggleProductActivation(productId: string, isActive: boolean) {
      const { execute, status, error, data } = useApiRequest<IProduct>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => toggleProductActivationAdmin(productId, isActive, this.controller!.signal));

      if (status.value === "success" && data.value) {
        const index = this.products.findIndex(p => p._id === productId);
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
      await execute(() => duplicateProductAdmin(productId, this.controller!.signal));

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
      await execute(() => searchProductsAdmin(filters, this.controller!.signal));

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
      await execute(() => fetchProductByIdAdmin(productId, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.selectedProduct = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    // Gestion des erreurs et réinitialisation
    resetStore() {
      this.products = [];
      this.productsWithPriceInfo = [];
      this.selectedProduct = null;
      this.filters = null;
      this.variants = [];
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
