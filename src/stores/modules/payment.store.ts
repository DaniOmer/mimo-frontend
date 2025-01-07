import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import { createPaymentIntent } from "../../api/payment/payment.api";
import { IPaymentIntent } from "../../api/payment/payment.type";
import { PaymentIntent, PaymentMethod } from "@stripe/stripe-js";
import { useCartStore } from "./cart.store";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentMethod: null as PaymentMethod | null,
    paymentIntent: null as PaymentIntent | null,
    error: null as string | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["paymentMethod", "paymentIntentId"],
  },

  getters: {
    isPaymentProcessing: (state) => state.paymentMethod && state.paymentIntent,
  },

  actions: {
    reset() {
      this.paymentMethod = null;
      this.paymentIntent = null;
      this.error = null;
      this.status = "idle";
    },

    async createPaymentIntent(paymentData: IPaymentIntent) {
      const { execute, status, error, data } = useApiRequest<any>();
      this.error = null;
      this.status = "pending";

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() =>
        createPaymentIntent(paymentData, this.controller!.signal)
      );

      if (status.value === "success" && data.value) {
        this.paymentIntent = data.value;
        const cartStore = useCartStore();
        cartStore.resetCartStore();
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },
  },
});
