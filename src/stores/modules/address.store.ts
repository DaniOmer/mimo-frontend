import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import { addAddress, getUserAddresses } from "../../api/address/address.api";
import { IAddress } from "../../api";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [] as IAddress[] | null,
    getAddressesState: {
      status: "idle" as "idle" | "pending" | "success" | "failed",
      error: null as any | null,
    },
    addAddressState: {
      status: "idle" as "idle" | "pending" | "success" | "failed",
      error: null as any | null,
    },
    controller: null as AbortController | null,
  }),

  getters: {
    isGetAddressesLoading: (state) =>
      state.getAddressesState.status === "pending",
    isAddAddressLoading: (state) => state.addAddressState.status === "pending",
  },

  actions: {
    async getAddresses() {
      const { execute, status, error, data } = useApiRequest<IAddress[]>();
      this.getAddressesState.status = "pending";
      this.getAddressesState.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => getUserAddresses(this.controller!.signal));

      if (status.value === "success") {
        this.addresses = data.value;
        this.getAddressesState.status = "success";
      } else {
        this.getAddressesState.error = error.value;
        this.getAddressesState.status = "failed";
      }
    },

    async addAddress(addressData: Omit<IAddress, "_id" | "user">) {
      const { execute, status, error, data } = useApiRequest<IAddress>();
      this.addAddressState.status = "pending";
      this.addAddressState.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => addAddress(addressData, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.getAddresses();
        this.addAddressState.status = "success";
      } else {
        this.addAddressState.error = error.value;
        this.addAddressState.status = "failed";
      }
    },
  },
});
