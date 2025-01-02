import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import { fetchProducts, fetchProductWithVariants } from "../../api/product/product.api";
import { IProduct } from "../../api/product/product.types";
import { IProductVariant } from "../../api/product/productVariant.types";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as IProduct[],
    product: null as IProduct | null,
    variants: [] as IProductVariant[],
    error: null as any | null,
    loading: false,
  }),
  getters: {
    uniqueCategories(state) {
      return state.product?.categoryIds?.map((category: any) => category.name) || [];
    },
    uniqueFeatures(state) {
      return state.product?.featureIds?.map((feature: any) => feature.name) || [];
    },
    uniqueSizes(state) {
      return state.variants ? [...new Set(state.variants.map((variant) => variant.sizeId.name))] : [];
    },
    uniqueColors(state) {
      return state.variants ? state.variants.map((variant) => ({
        name: variant.colorId.name,
        hexCode: variant.colorId.hexCode,
      })) : [];
    },
  },
  actions: {
    async loadProducts() {
      const { execute } = useApiRequest<IProduct[]>();
      const response = await execute(fetchProducts);
    
      if (response && response.data) {
        this.products = response.data;
      } else {
        this.products = [];
        console.error("Failed to load products");
      }
    },

    async loadProductWithVariants(productId: string) {
      const { execute, loading, error, data } = useApiRequest();
      await execute(() => fetchProductWithVariants(productId));
    
      if (data.value) {
        this.product = data.value.data.product;
        this.variants = data.value.data.variants;
      } else {
        this.product = null;
        this.variants = [];
      }
    
      this.error = error.value;
      this.loading = loading.value;
    }    
  },
});