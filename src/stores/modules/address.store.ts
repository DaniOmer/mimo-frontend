import { defineStore } from "pinia";

import { useApiRequest } from "../../composables";
import { getUserAddresses } from "../../api/address/address.api";
import { IAddress } from "../../api";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [] as IAddress[] | null,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["addresses"],
  },

  getters: {
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    async getAddresses() {
      const { execute, status, error, data } = useApiRequest<IAddress[]>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = status.value;
      await execute(() => getUserAddresses(this.controller!.signal));

      this.addresses = data.value;
      this.error = error.value;
    },
  },
});
