import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  registerUser,
  verifyEmail,
  IUserCreate,
  IUserCreateResponse,
} from "../../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as IUserCreateResponse | null,
    token: null as string | null,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    async register(user: IUserCreate) {
      const { execute, status, error, data } =
        useApiRequest<IUserCreateResponse>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = "pending";
      await execute(() => registerUser(user, this.controller!.signal));

      this.user = data.value;
      this.error = error.value;
      this.status = status.value;
    },

    async verifyEmail(tokenData: { token: string }) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = "pending";
      await execute(() => verifyEmail(tokenData, this.controller!.signal));

      this.error = error.value;
      this.status = status.value;
    },

    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      this.status = "idle";
    },

    cancelRequest() {
      const { cancel } = useApiRequest<IUserCreateResponse>();
      cancel();
    },
  },
});
