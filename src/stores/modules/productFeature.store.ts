import { defineStore } from 'pinia';
import { 
  fetchAllProductFeatures, 
  fetchProductFeatureById, 
  createProductFeature, 
  updateProductFeature, 
  deleteProductFeature 
} from '../../api/';
import type { IProductFeature } from '../../api/'; 

export const useProductFeatureStore = defineStore('productFeature', {
  state: () => ({
    productFeatures: [] as IProductFeature[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProductFeatures(signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        this.productFeatures = await fetchAllProductFeatures(signal);
      } catch (err) {
        this.error = 'Erreur lors de la récupération des caractéristiques produits.';
      } finally {
        this.loading = false;
      }
    },

    async createProductFeature(data: Partial<IProductFeature>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const newFeature = await createProductFeature(data, signal);
        this.productFeatures.push(newFeature);
      } catch (err) {
        this.error = 'Erreur lors de la création de la caractéristique produit.';
      } finally {
        this.loading = false;
      }
    },

    async updateProductFeature(id: string, data: Partial<IProductFeature>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const updatedFeature = await updateProductFeature(id, data, signal);
        const index = this.productFeatures.findIndex(feature => feature._id === id);
        if (index !== -1) {
          this.productFeatures[index] = updatedFeature;
        }
      } catch (err) {
        this.error = 'Erreur lors de la mise à jour de la caractéristique produit.';
      } finally {
        this.loading = false;
      }
    },

    async deleteProductFeature(id: string, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        await deleteProductFeature(id, signal);
        this.productFeatures = this.productFeatures.filter(feature => feature._id !== id);
      } catch (err) {
        this.error = 'Erreur lors de la suppression de la caractéristique produit.';
      } finally {
        this.loading = false;
      }
    },

    async getProductFeatureById(id: string, signal?: AbortSignal): Promise<IProductFeature | null> {
      this.loading = true;
      this.error = null;
      try {
        const feature = await fetchProductFeatureById(id, signal);
        return feature;
      } catch (err) {
        this.error = 'Erreur lors de la récupération de la caractéristique produit.';
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
