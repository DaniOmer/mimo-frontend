import { defineStore } from "pinia";
import { useApiRequest } from "../../composables/useApiRequest";
import {
  fetchAllColors,
  fetchColorById,
  createColor as apiCreateColor,
  updateColor as apiUpdateColor,
  deleteColor as apiDeleteColor,
  deleteMutipleColors,
} from "../../api/";
import type { IColor } from "../../api/";

export const useColorStore = defineStore("color", {
  state: () => ({
    colors: [] as IColor[],
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

    async fetchColors() {
      const { execute, status, error } = useApiRequest<IColor[]>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => fetchAllColors(this.controller!.signal));

      if (result) {
        this.colors = result;
      }

      this.status = status.value;
      this.error = error.value;
    },

    async createColor(colorData: Partial<IColor>) {
      const { execute, status, error } = useApiRequest<IColor>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiCreateColor(colorData, this.controller!.signal));

      if (result) {
        this.colors.push(result);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async updateColor(id: string, colorData: Partial<IColor>) {
      const { execute, status, error } = useApiRequest<IColor>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiUpdateColor(id, colorData, this.controller!.signal));

      if (result) {
        const index = this.colors.findIndex((color) => color._id === id);
        if (index !== -1) {
          this.colors[index] = result;
        }
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteColor(id: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const result = await execute(() => apiDeleteColor(id, this.controller!.signal));

      if (result === null) {
        this.colors = this.colors.filter((color) => color._id !== id);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteMultipleColors(ids: string[]) {
        const { execute, status, error } = useApiRequest<void>();
        this.error = null;
        this.initController();
    
        this.status = status.value;
    
        const result = await execute(() => deleteMutipleColors(ids, this.controller!.signal));
    
        if (result === null) {
            this.colors = this.colors.filter((color) => !ids.includes(color._id));
        }
    
        this.status = status.value;
        this.error = error.value;
    },
    

    async getColorById(id: string): Promise<IColor | null> {
      const { execute, status, error } = useApiRequest<IColor>();
      this.error = null;
      this.initController();

      this.status = status.value;

      const color = await execute(() => fetchColorById(id, this.controller!.signal));

      this.status = status.value;
      this.error = error.value;

      return color;
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
