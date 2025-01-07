import { defineStore } from "pinia";

import { IOrder, OrderCreateDTO, OrderStatus } from "../../api/";
import {
  fetchAllOrders,
  updateOrderStatus,
  getOrdersByUserId,
  getOrderByNumber,
  fetchOders,
  createOrderForUser,
  IAdminCreateOrderPayload,
  createOrder,
} from "../../api/";
import { useApiRequest } from "../../composables/useApiRequest";
import { useCartStore } from "./cart.store";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as IOrder[],
    selectedOrderDetails: null as IOrder | null,
    createdOrder: null as IOrder | null,
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
        this.selectedOrderDetails = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async updateOrderStatus(orderId: string, status: OrderStatus) {
      const {
        execute,
        status: reqStatus,
        error,
        data,
      } = useApiRequest<IOrder>();
      this.error = null;
      this.initializeController();
      this.status = "pending";

      await execute(() =>
        updateOrderStatus(orderId, status, this.controller!.signal)
      );

      if (reqStatus.value === "success" && data.value) {
        const index = this.orders.findIndex((order) => order._id === orderId);
        if (index !== -1) {
          this.orders[index].status = data.value.status;
        }

        if (
          this.selectedOrderDetails &&
          this.selectedOrderDetails._id === orderId
        ) {
          this.selectedOrderDetails.status = data.value.status;
        }
      }

      this.error = error.value;
      this.status = reqStatus.value;
    },

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

    async createOrder(orderData: OrderCreateDTO) {
      const { execute, status, error, data } = useApiRequest<IOrder>();
      this.error = null;
      this.initializeController();
      this.status = "pending";

      await execute(() => createOrder(orderData, this.controller!.signal));
      if (status.value === "success" && data.value) {
        this.createdOrder = data.value;
      }
      this.error = error.value;
      this.status = status.value;
    },

    async createOrderForUserAction(
      userId: string,
      payload: IAdminCreateOrderPayload
    ) {
      const { execute, status, error, data } = useApiRequest<IOrder>();
      this.error = null;
      this.initializeController();
      this.status = "pending";

      await execute(() =>
        createOrderForUser(userId, payload, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.orders.push(data.value);
      }

      this.error = error.value;
      this.status = status.value;
      return data.value;
    },

    resetState() {
      this.orders = [];
      this.selectedOrderDetails = null;
      this.error = null;
      this.status = "idle";

      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },
  },
});
