import { defineStore } from "pinia";
import {
  addToCart,
  fetchUserCart,
  updateCartItemQuantity,
  deleteCartItem,
} from "../../api/cart/cart.api";
import { useApiRequest } from "../../composables";

import {
  CartItemCreateDTO,
  CartItemUpdateDTO,
  ICart,
  ICartItem,
} from "../../api/cart/cart.types";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: null as ICart | null,
    items: [] as ICartItem[],
    error: null as string | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  persist: {
    pick: ["cart", "items"],
  },

  getters: {
    cartTotalEtx: (state) => {
      return state.items.reduce(
        (total, item) => total + item.quantity * item.priceEtx,
        0
      );
    },
    cartTotalVat: (state) => {
      return state.items.reduce(
        (total, item) => total + item.quantity * item.priceVat,
        0
      );
    },
  },

  actions: {
    async getCart() {
      const { execute, error, data, status } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => fetchUserCart(this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.cart = data.value;
        this.items = [...data.value.items];
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },

    async addToCart(item: CartItemCreateDTO) {
      const { execute, error, status } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => addToCart(item, this.controller!.signal));

      if (status.value === "success") {
        this.getCart();
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },

    async updateCartItemQuantity(item: CartItemUpdateDTO) {
      const { execute, error, status } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() =>
        updateCartItemQuantity(item, this.controller!.signal)
      );

      if (status.value === "success") {
        this.getCart();
      } else {
        this.error = error.value;
      }
      this.status = status.value;
    },

    async removeProductFromCart(cartItemId: string) {
      const { execute, error, status } = useApiRequest();
      this.error = error.value;
      this.status = status.value;

      if (!this.controller) {
        this.controller = new AbortController();
      }

      await execute(() => deleteCartItem(cartItemId, this.controller!.signal));

      if (status.value === "success") {
        this.getCart();
      }

      this.error = error.value;
      this.status = status.value;
    },

    cancelRequest() {
      const { cancel } = useApiRequest<void>();
      cancel();
    },

    resetStatus() {
      this.items = [];
      this.status = "idle";
      this.error = null;
      this.controller = null;
    },
  },
});
