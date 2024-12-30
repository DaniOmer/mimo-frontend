import { defineStore } from "pinia";

import { useApiRequest } from "../../composables";
import { createUser, IUserCreate, IUserCreateResponse } from "../../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as IUserCreateResponse | null,
    error: null as any | null,
    loading: false,
    controller: null as AbortController | null,
  }),
  actions: {
    async register(user: IUserCreate) {
      const { execute, loading, error, data } =
        useApiRequest<IUserCreateResponse>();

      if (!this.controller) {
        this.controller = new AbortController();
      }
      this.loading = true;
      await execute(() => createUser(user, this.controller!.signal));

      this.user = data.value;
      this.error = error.value;
      this.loading = loading.value;
      console.log("AUTH STORE : ", this.loading);
    },

    cancelRequest() {
      const { cancel } = useApiRequest<IUserCreateResponse>();
      cancel();
    },
  },
});
