import { defineStore } from "pinia";
import {
  fetchAllSizes,
  fetchSizeById,
  createSize,
  updateSize,
  deleteSize,
} from "../../api/";
import type { ISize } from "../../api";

export const useSizeStore = defineStore("size", {
  state: () => ({
    sizes: [] as ISize[],
    loading: false,
    error: null as string | null,
  }),

  actions: {

    async fetchSizes(signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        this.sizes = await fetchAllSizes(signal);
      } catch (err) {
        this.error = "Erreur lors de la récupération des tailles.";
      } finally {
        this.loading = false;
      }
    },

    async createSize(data: Partial<ISize>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const newSize = await createSize(data, signal);
        this.sizes.push(newSize);
      } catch (err) {
        this.error = "Erreur lors de la création de la taille.";
      } finally {
        this.loading = false;
      }
    },

    async updateSize(id: string, data: Partial<ISize>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const updatedSize = await updateSize(id, data, signal);
        const index = this.sizes.findIndex((size) => size._id === id);
        if (index !== -1) {
          this.sizes[index] = updatedSize;
        }
      } catch (err) {
        this.error = "Erreur lors de la mise à jour de la taille.";
      } finally {
        this.loading = false;
      }
    },

    async deleteSize(id: string, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        await deleteSize(id, signal);
        this.sizes = this.sizes.filter((size) => size._id !== id);
      } catch (err) {
        this.error = "Erreur lors de la suppression de la taille.";
      } finally {
        this.loading = false;
      }
    },

    async getSizeById(id: string, signal?: AbortSignal): Promise<ISize | null> {
      this.loading = true;
      this.error = null;
      try {
        const size = await fetchSizeById(id, signal);
        return size;
      } catch (err) {
        this.error = "Erreur lors de la récupération de la taille.";
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
