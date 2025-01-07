import { defineStore } from "pinia";
import { PaymentMethod } from "@stripe/stripe-js";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    paymentMethod: null as PaymentMethod | null,
    paymentIntentId: null as string | null,
    error: null as string | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
  }),

  persist: {
    pick: ["paymentMethod", "paymentIntentId"],
  },

  getters: {
    isPaymentProcessing: (state) =>
      state.paymentMethod && state.paymentIntentId,
  },

  actions: {
    reset() {
      this.paymentMethod = null;
      this.paymentIntentId = null;
      this.error = null;
      this.status = "idle";
    },
  },
});
