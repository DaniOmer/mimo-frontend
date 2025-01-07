import { defineStore } from "pinia";
import { useApiRequest } from "../../composables/useApiRequest";
import {
  fetchAllProductFeatures,
  fetchProductFeatureById,
  createProductFeature as apiCreateProductFeature,
  updateProductFeature as apiUpdateProductFeature,
  deleteProductFeature as apiDeleteProductFeature,
  deleteMultipleProductFeatures,
} from "../../api/";
import type { IProductFeature } from "../../api/";

export const useProductFeatureStore = defineStore("productFeature", {
  state: () => ({
    productFeatures: [] as IProductFeature[],
    status: "idle" as "idle" | "pending" | "success" | "failed",
    error: null as string | null,
    controller: null as AbortController | null,
  }),

  getters: {
    isLoading: (state) => state.status === "pending",
    hasError: (state) => !!state.error,
  },

  actions: {
    initController() {
      if (!this.controller) {
        this.controller = new AbortController();
      }
    },

    async fetchProductFeatures() {
      const { execute, status, error } = useApiRequest<IProductFeature[]>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => fetchAllProductFeatures(this.controller!.signal));

      if (result) {
        this.productFeatures = result;
      }

      this.status = status.value;
      this.error = error.value;
    },

    async createProductFeature(featureData: Partial<IProductFeature>) {
      const { execute, status, error } = useApiRequest<IProductFeature>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiCreateProductFeature(featureData, this.controller!.signal));

      if (result) {
        this.productFeatures.push(result);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async updateProductFeature(id: string, featureData: Partial<IProductFeature>) {
      const { execute, status, error } = useApiRequest<IProductFeature>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiUpdateProductFeature(id, featureData, this.controller!.signal));

      if (result) {
        const index = this.productFeatures.findIndex((feature) => feature._id === id);
        if (index !== -1) {
          this.productFeatures[index] = result;
        }
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteProductFeature(id: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiDeleteProductFeature(id, this.controller!.signal));

      if (result === null) {
        this.productFeatures = this.productFeatures.filter((feature) => feature._id !== id);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteMultipleProductFeatures(ids: string[]) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => deleteMultipleProductFeatures(ids, this.controller!.signal));

      if (result === null) {
        this.productFeatures = this.productFeatures.filter((feature) => !ids.includes(feature._id));
      }

      this.status = status.value;
      this.error = error.value;
    },


    async getProductFeatureById(id: string): Promise<IProductFeature | null> {
      const { execute, status, error } = useApiRequest<IProductFeature>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const feature = await execute(() => fetchProductFeatureById(id, this.controller!.signal));

      this.status = status.value;
      this.error = error.value;

      return feature;
    },

    cancelRequest() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
        this.status = "idle";
      }
    },

    resetStatus() {
      this.status = "idle";
      this.error = null;
    },
  },
});
