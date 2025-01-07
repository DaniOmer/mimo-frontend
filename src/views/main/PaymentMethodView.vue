<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full flex justify-center items-start gap-6">
      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md"
      >
        <h2 class="text-base font-semibold text-gray-800 mb-4">
          <ShieldCheckIcon class="h-6 w-6 inline-block" /> Paiement sécurisé
        </h2>

        <div v-if="error" class="mb-4 text-red-500 text-sm">
          {{ error }}
        </div>

        <!-- USER INFORMATIONS -->
        <label for="first-name" class="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <input
          id="first-name"
          type="text"
          v-model="firstName"
          class="mt-2 w-full rounded-lg border border-gray-300 p-2 bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Entrez votre prénom"
          required
        />

        <label
          for="last-name"
          class="block text-sm font-medium text-gray-700 mt-4"
        >
          Nom
        </label>
        <input
          id="last-name"
          type="text"
          v-model="lastName"
          class="mt-2 w-full rounded-lg border border-gray-300 p-2 bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Entrez votre nom"
          required
        />

        <!-- STRIPE FIELDS -->
        <label
          for="card-element"
          class="block text-sm font-medium text-gray-700 mt-4"
        >
          Informations de carte
        </label>
        <div
          id="card-element"
          class="mt-2 rounded-lg border border-gray-300 p-3 bg-gray-50"
        ></div>

        <!-- BUTTON -->
        <!-- <button
        type="submit"
        :disabled="isLoading"
        class="mt-6 w-full rounded-lg bg-primary-600 px-4 py-2 text-white border border-primary bg-primary hover:bg-transparent hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all ease-in-out delay-200"
      >
        {{ isLoading ? "Traitement en cours..." : "Finaliser la commande" }}
      </button> -->
        <div class="mt-8">
          <BaseButton
            type="submit"
            label="Finaliser la commande"
            :isLoading="isLoading"
          />
        </div>
      </form>
      <div
        class="space-y-10 w-3/12 ml-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <p class="text-base font-semibold text-gray-900">Détail du panier</p>
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between gap-4">
              <div class="text-base font-normal text-gray-500">Total HT</div>
              <div class="text-base font-medium text-gray-900">
                {{ totalHT }} €
              </div>
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="text-base font-normal text-gray-500">TVA (20%)</div>
              <div class="text-base font-medium text-gray-900">{{ tva }} €</div>
            </div>
          </div>

          <div
            class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2"
          >
            <div class="text-base font-bold text-gray-900">
              Total <span class="text-xs font-normal">TVA incluse</span>
            </div>
            <div class="text-base font-bold text-gray-900">{{ total }} €</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { onMounted, onUnmounted, ref, toRefs, computed } from "vue";
import { usePaymentStore } from "../../stores/modules/payment.store";
import { useCartStore } from "../../stores/modules/cart.store";
import { useStripe } from "../../composables/useStripe";
import { useAuthStore } from "../../stores";
import BaseButton from "../../components/form/BaseButton.vue";
import CartSummary from "../../components/CartSummary.vue";

import { ShieldCheckIcon } from "@heroicons/vue/24/outline";

const paymentStore = usePaymentStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { cart, items } = toRefs(cartStore);

const router = useRouter();

const totalHT = computed(() =>
  cartStore.items.reduce(
    (sum, item) => sum + item.product.priceEtx * item.quantity,
    0
  )
);
const tva = computed(() => totalHT.value * 0.2);
const total = computed(() => totalHT.value + tva.value);
const {
  cardElement,
  createPaymentMethod,
  initializeStripeElements,
  confirmPayment,
} = useStripe();

const error = ref("");
const isLoading = ref(false);
const firstName = ref("");
const lastName = ref("");

const handleSubmit = async () => {
  if (!cardElement) {
    error.value = "L'élément de carte Stripe n'est pas disponible.";
    return;
  }

  isLoading.value = true;

  try {
    const paymentMethod = await createPaymentMethod({
      billing_details: {
        name: `${firstName.value} ${lastName.value}`,
      },
    });
    await paymentStore.createPaymentIntent({
      amount: total.value,
      paymentMethod: paymentMethod.id,
      currency: "eur",
      receiptEmail: authStore.user?.email,
    });
    console.log("Méthode de paiement créée", paymentMethod);

    if (
      paymentStore.paymentIntent &&
      paymentStore.paymentIntent.client_secret
    ) {
      console.log(
        "Intent de paiement",
        paymentStore.paymentIntent.client_secret
      );

      const { error: confirmError, paymentIntent } = await confirmPayment(
        paymentStore.paymentIntent.client_secret,
        paymentMethod.id
      );

      if (confirmError) {
        error.value = confirmError.message;
        console.error(
          "Erreur lors de la confirmation du paiement :",
          confirmError
        );
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Paiement réussi !", paymentIntent);
        alert("Paiement réussi ! Merci pour votre commande.");
        router.push({ name: "checkoutConfirmation" });
      } else {
        console.error(
          "Statut inattendu du PaymentIntent :",
          paymentIntent?.status
        );
        error.value = "Le paiement n'a pas pu être effectué.";
      }
    } else {
      error.value = "Impossible de récupérer le client_secret.";
    }
  } catch (err) {
    console.log("Méthode de paiement échouée", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  initializeStripeElements();
});

// onUnmounted(() => {
//   if (cardElement) {
//     cardElement.destroy();
//   }
// });
</script>
