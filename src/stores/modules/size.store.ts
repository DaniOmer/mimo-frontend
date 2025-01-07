import { defineStore } from "pinia";
import { useApiRequest } from "../../composables/useApiRequest";
import {
  fetchAllSizes,
  fetchSizeById,
  createSize as apiCreateSize,
  updateSize as apiUpdateSize,
  deleteSize as apiDeleteSize,
  deleteMultipleSizes,
} from "../../api/";
import type { ISize } from "../../api";

export const useSizeStore = defineStore("size", {
  state: () => ({
    sizes: [] as ISize[],
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

    async fetchSizes() {
      const { execute, status, error } = useApiRequest<ISize[]>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => fetchAllSizes(this.controller!.signal));

      if (result) {
        this.sizes = result;
      }

      this.status = status.value;
      this.error = error.value;
    },

    async createSize(sizeData: Partial<ISize>) {
      const { execute, status, error } = useApiRequest<ISize>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiCreateSize(sizeData, this.controller!.signal));

      if (result) {
        this.sizes.push(result);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async updateSize(id: string, sizeData: Partial<ISize>) {
      const { execute, status, error } = useApiRequest<ISize>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiUpdateSize(id, sizeData, this.controller!.signal));

      if (result) {
        const index = this.sizes.findIndex((size) => size._id === id);
        if (index !== -1) {
          this.sizes[index] = result;
        }
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteSize(id: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiDeleteSize(id, this.controller!.signal));

      if (result === null) {
        this.sizes = this.sizes.filter((size) => size._id !== id);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteMultipleSizes(ids: string[]) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => deleteMultipleSizes(ids, this.controller!.signal));

      if (result === null) {
        this.sizes = this.sizes.filter((size) => !ids.includes(size._id));
      }

      this.status = status.value;
      this.error = error.value;
    },

    async getSizeById(id: string): Promise<ISize | null> {
      const { execute, status, error } = useApiRequest<ISize>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const size = await execute(() => fetchSizeById(id, this.controller!.signal));

      this.status = status.value;
      this.error = error.value;

      return size;
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
