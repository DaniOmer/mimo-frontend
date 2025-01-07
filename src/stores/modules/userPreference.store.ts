import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  IUserPreference,
  fetchUserPreference,
  updateUserPreference,
  deleteUserPreference,
} from "../../api";

import { useUserStore } from "./user.store";

export const useUserPreferenceStore = defineStore("userPreference", {
  state: () => ({
    preferences: {} as IUserPreference,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["preferences"],
  },

  getters: {
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    async fetchUserPreference() {
      const { execute, status, error, data } = useApiRequest<IUserPreference>();
      this.error = error.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      const userStore = useUserStore();
      await execute(() =>
        fetchUserPreference(
          userStore.user?._id as string,
          this.controller!.signal
        )
      );

      if (status.value === "success" && data.value) {
        this.preferences = data.value;
        this.status = status.value;
      } else {
        this.error = error.value;
        this.status = status.value;
      }
    },

    async updateUserPreference(
      data: Omit<IUserPreference, "user" | "_id" | "createdAt" | "updatedAt">,
      userPreferenceId: string
    ) {
      const {
        execute,
        status,
        error,
        data: dataResponse,
      } = useApiRequest<IUserPreference>();
      this.error = error.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }
      this.status = status.value;
      await execute(() =>
        updateUserPreference(data, userPreferenceId, this.controller!.signal)
      );

      if (status.value === "success" && dataResponse.value) {
        this.preferences = dataResponse.value;
        this.status = status.value;
      } else {
        this.error = error.value;
        this.status = status.value;
      }
    },

    async deleteUserPreference(userPreferenceId: string) {
      const { execute, status, error } = useApiRequest<IUserPreference>();
      this.error = error.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() =>
        deleteUserPreference(userPreferenceId, this.controller!.signal)
      );

      this.status = status.value;
      this.error = error.value;
      this.status = status.value;
    },

    cancel() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },

    resetStatus() {
      this.cancel();
      this.status = "idle";
      this.error = null;
    },
  },
});
