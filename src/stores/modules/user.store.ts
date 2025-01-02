import { defineStore } from "pinia";

import { useApiRequest } from "../../composables";
import {
  IUser,
  fetchUser,
  updateUser,
  updatePassword,
  IPasswordChange,
} from "../../api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as IUser | null,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["user"],
  },

  getters: {
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    async fetchProfile(id: string) {
      try {
        console.log("USER STORE ID", id);
        const { execute, status, error, data } = useApiRequest<IUser>();
        this.error = error.value;

        if (!this.controller) {
          this.controller = new AbortController();
        }

        this.status = status.value;
        await execute(() => fetchUser(id, this.controller!.signal));
        console.log("USER STORE", data.value);

        this.user = data.value;
        this.error = error.value;
        this.status = status.value;
      } catch (error) {
        console.log("Error on user fetch: ", error);
      }
    },

    async updateProfile(userData: IUser) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = error.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() => updateUser(userData, this.controller!.signal));

      if (status.value && data.value) {
        this.user = data.value;
        this.status = status.value;
      } else {
        this.error = error.value;
        this.status = status.value;
      }
    },

    async changePassword(passwordData: IPasswordChange) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = error.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() =>
        updatePassword(passwordData, this.controller!.signal)
      );

      if (status.value && data.value) {
        this.user = data.value;
        this.status = status.value;
      } else {
        this.error = error.value;
        this.status = status.value;
      }
    },

    resetUser() {
      this.user = null;
      this.status = "idle";
      this.error = null;
    },
  },
});
