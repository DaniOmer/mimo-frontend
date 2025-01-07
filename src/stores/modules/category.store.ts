import { defineStore } from 'pinia';
import { useApiRequest } from '../../composables/useApiRequest';
import { 
  fetchAllCategories, 
  fetchCategoryById, 
  createCategory as apiCreateCategory, 
  updateCategory as apiUpdateCategory, 
  deleteCategory as apiDeleteCategory,
  deleteMutipleCategories as apiDeleteMutipleCategories,

} from '../../api/';
import type { ICategory } from '../../api'; 

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
    status: 'idle' as 'idle' | 'pending' | 'success' | 'failed',
    error: null as string | null,
    controller: null as AbortController | null,
  }),

  getters: {
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    initController() {
      if (!this.controller) {
        this.controller = new AbortController();
      }
    },

    async fetchCategories() {
      const { execute, status, error } = useApiRequest<ICategory[]>();
      this.initController();

      this.status = status.value;
      const result = await execute(() => fetchAllCategories(this.controller!.signal));

      if (result) {
        this.categories = result;
      }

      this.status = status.value;
      this.error = error.value;
    },

    async createCategory(data: Partial<ICategory>) {
      const { execute, status, error } = useApiRequest<ICategory>();
      this.initController();

      this.status = status.value;
      const result = await execute(() => apiCreateCategory(data, this.controller!.signal));

      if (result) {
        this.categories.push(result);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async updateCategory(id: string, data: Partial<ICategory>) {
      const { execute, status, error } = useApiRequest<ICategory>();
      this.initController();

      this.status = status.value;
      const result = await execute(() => apiUpdateCategory(id, data, this.controller!.signal));

      if (result) {
        const index = this.categories.findIndex(cat => cat._id === id);
        if (index !== -1) {
          this.categories[index] = result;
        }
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteCategory(id: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.initController();

      this.status = status.value;
      const result = await execute(() => apiDeleteCategory(id, this.controller!.signal));

      if (result === null) { 
        this.categories = this.categories.filter(cat => cat._id !== id);
      }

      this.status = status.value;
      this.error = error.value;
    },

    async deleteMutipleCategories(ids: string[]) {
      const { execute, status, error } = useApiRequest<void>();
      this.initController();

      this.status = status.value;
      await execute(() => apiDeleteMutipleCategories(ids, this.controller!.signal));

      if (status.value === 'success') {
        this.categories = this.categories.filter(cat => !ids.includes(cat._id));
      }

      this.status = status.value;
      this.error = error.value;
    },

    async getCategoryById(id: string): Promise<ICategory | null> {
      const { execute, status, error } = useApiRequest<ICategory>();
      this.initController();

      this.status = status.value;
      const category = await execute(() => fetchCategoryById(id, this.controller!.signal));

      this.status = status.value;
      this.error = error.value;

      return category;
    },

    cancelRequest() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },

    resetStatus() {
      this.status = 'idle';
      this.error = null;
    },
  },
});
