import { defineStore } from "pinia";

import { useApiRequest } from "../../composables";
import { createUser, IUserCreate, IUserCreateResponse } from "../../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as IUserCreateResponse | null,
    error: null as any | null,
    loading: false,
  }),
  actions: {
    async register(user: IUserCreate) {
      const { execute, loading, error, data } =
        useApiRequest<IUserCreateResponse>();
      await execute(() => createUser(user));

      this.user = data.value;
      this.error = error.value;
      this.loading = loading.value;
    },
  },
});
