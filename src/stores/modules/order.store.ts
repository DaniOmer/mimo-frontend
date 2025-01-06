import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import { fetchOders } from "../../api/order/order.api";
import type { IOrder } from "../../api/order/order.types";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [] as IOrder[], 
    error: null as any | null, 
    status: "idle" as "idle" | "pending" | "success" | "failed", 
    controller: null as AbortController | null, 
  }),

  persist: {
    pick: ["orders"], 
  },

  getters: {
    isLoading: (state) => state.status === "pending",  
    totalOrders: (state) => state.orders.length, 
  },

  actions: {
    async fetchOrders() {
      const { execute, status, error, data } = useApiRequest<IOrder[]>();
      this.error = null;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      this.status = "pending"; 
      await execute(() => fetchOders(this.controller!.signal)); 

      this.orders = data.value || []; 
      this.error = error.value; 
      this.status = status.value; 
    },

    resetStore() {
      this.orders = [];
      this.error = null;
      this.status = "idle";
    },

    cancelRequest() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
        this.status = "idle";
      }
    },
  },
});

