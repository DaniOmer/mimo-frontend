import { defineStore } from 'pinia';
import { 
  fetchAllCategories, 
  fetchCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../../api/';
import type { ICategory } from '../../api'; 

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    /**
     * Récupère toutes les catégories depuis l'API et les stocke dans l'état.
     */
    async fetchCategories(signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        this.categories = await fetchAllCategories(signal);
      } catch (err) {
        this.error = 'Erreur lors de la récupération des catégories.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Crée une nouvelle catégorie via l'API et l'ajoute à l'état.
     * @param data Les données de la nouvelle catégorie.
     */
    async createCategory(data: Partial<ICategory>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const newCategory = await createCategory(data, signal);
        this.categories.push(newCategory);
      } catch (err) {
        this.error = 'Erreur lors de la création de la catégorie.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Met à jour une catégorie existante via l'API et met à jour l'état.
     * @param id L'ID de la catégorie à mettre à jour.
     * @param data Les données mises à jour de la catégorie.
     */
    async updateCategory(id: string, data: Partial<ICategory>, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        const updatedCategory = await updateCategory(id, data, signal);
        const index = this.categories.findIndex(cat => cat._id === id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
      } catch (err) {
        this.error = 'Erreur lors de la mise à jour de la catégorie.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Supprime une catégorie via l'API et met à jour l'état.
     * @param id L'ID de la catégorie à supprimer.
     */
    async deleteCategory(id: string, signal?: AbortSignal) {
      this.loading = true;
      this.error = null;
      try {
        await deleteCategory(id, signal);
        this.categories = this.categories.filter(cat => cat._id !== id);
      } catch (err) {
        this.error = 'Erreur lors de la suppression de la catégorie.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Récupère une catégorie spécifique par son ID.
     * @param id L'ID de la catégorie.
     * @returns La catégorie correspondante.
     */
    async getCategoryById(id: string, signal?: AbortSignal): Promise<ICategory | null> {
      this.loading = true;
      this.error = null;
      try {
        const category = await fetchCategoryById(id, signal);
        return category;
      } catch (err) {
        this.error = 'Erreur lors de la récupération de la catégorie.';
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});