import { defineStore } from 'pinia';
import { 
  fetchAllColors, 
  fetchColorById, 
  createColor, 
  updateColor, 
  deleteColor 
} from '../../api/';
import type { IColor } from '../../api/'; 

export const useColorStore = defineStore('color', {
  state: () => ({
    colors: [] as IColor[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchColors(signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        this.colors = await fetchAllColors(signal);
      } catch (err) {
        this.error = 'Erreur lors de la récupération des couleurs.';
      } finally {
        this.loading = false;
      }
    },

    async createColor(data: Partial<IColor>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const newColor = await createColor(data, signal);
        this.colors.push(newColor);
      } catch (err) {
        this.error = 'Erreur lors de la création de la couleur.';
      } finally {
        this.loading = false;
      }
    },

    async updateColor(id: string, data: Partial<IColor>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const updatedColor = await updateColor(id, data, signal);
        const index = this.colors.findIndex(color => color._id === id);
        if (index !== -1) {
          this.colors[index] = updatedColor;
        }
      } catch (err) {
        this.error = 'Erreur lors de la mise à jour de la couleur.';
      } finally {
        this.loading = false;
      }
    },

    async deleteColor(id: string, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        await deleteColor(id, signal);
        this.colors = this.colors.filter(color => color._id !== id);
      } catch (err) {
        this.error = 'Erreur lors de la suppression de la couleur.';
      } finally {
        this.loading = false;
      }
    },

    async getColorById(id: string, signal?: AbortSignal): Promise<IColor | null> {
      this.loading = true;
      this.error = null;
      try {
        const color = await fetchColorById(id, signal);
        return color;
      } catch (err) {
        this.error = 'Erreur lors de la récupération de la couleur.';
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
