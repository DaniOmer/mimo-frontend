import { defineStore } from "pinia";
import { IOrder, OrderStatus } from "../../api/";
import {
  fetchAllOrders,
  updateOrderStatus,
  getOrdersByUserId,
  getOrderByNumber,
} from "../../api/";
import { useApiRequest } from "../../composables/useApiRequest";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as IOrder[],
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  getters: {
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    initializeController() {
      if (!this.controller) {
        this.controller = new AbortController();
      }
    },

    async fetchAllOrders() {
      const { execute, status, error, data } = useApiRequest<IOrder[]>();
      this.error = null;
      this.initializeController();
      this.status = "pending";
      await execute(() => fetchAllOrders(this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.orders = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async fetchOrdersByUserId(userId: string) {
      const { execute, status, error, data } = useApiRequest<IOrder[]>();
      this.error = null;
      this.initializeController();
      this.status = "pending";
      await execute(() => getOrdersByUserId(userId, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.orders = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async fetchOrderByNumber(number: string) {
      const { execute, status, error, data } = useApiRequest<IOrder>();
      this.error = null;
      this.initializeController();
      this.status = "pending";
      await execute(() => getOrderByNumber(number, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.orders = [data.value];
      }

      this.error = error.value;
      this.status = status.value;
    },

    async updateOrderStatus(orderId: string, status: OrderStatus) {
      const { execute, status: reqStatus, error, data } = useApiRequest<IOrder>();
      this.error = null;
      this.initializeController();
      this.status = "pending";
      await execute(() => updateOrderStatus(orderId, status, this.controller!.signal));

      if (reqStatus.value === "success" && data.value) {
        const index = this.orders.findIndex((order) => order._id === orderId);
        if (index !== -1) {
          this.orders[index].status = data.value.status;
        }
      }

      this.error = error.value;
      this.status = reqStatus.value;
    },
    

    resetState() {
      this.orders = [];
      this.error = null;
      this.status = "idle";
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },
  },
});
